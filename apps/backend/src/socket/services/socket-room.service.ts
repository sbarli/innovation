import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GamesService } from 'src/games/games.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import {
  IRoomMetadata,
  SocketEvent,
  SocketEventError,
  SocketEventErrorCode,
} from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

export interface IBaseSocketServiceParams {
  user: UserWithoutPassword;
  socketServer: Socket;
}

export interface ISocketServiceMethodParamsWithRoomId extends IBaseSocketServiceParams {
  roomId: string;
}

export interface IHandleCreateRoomParams {
  roomName: string;
  user: UserWithoutPassword;
}

@Injectable()
export class SocketRoomService {
  private logger: Logger = new Logger('SocketRoomService');

  constructor(
    private readonly gamesService: GamesService,
    private readonly roomsService: RoomsService
  ) {}

  /**
   * @name handleGetRoomMetadata
   * @description gets metadata for specified room
   */
  async handleGetRoomMetadata(
    { roomId, socketServer, user }: ISocketServiceMethodParamsWithRoomId,
    byPassRoomValidation = false
  ) {
    try {
      if (!byPassRoomValidation) {
        const room = await this.roomsService.findRoomByRef(roomId);
        if (!room) {
          throw new Error(`Room ${roomId} not found. Check the room id and try again!`);
        }
      }

      const game = await this.gamesService.findGameByRoomRef(roomId);

      const connectedSockets = await socketServer.in(roomId).fetchSockets();

      const connectedPlayersData: IRoomMetadata = {
        gameId: game?._id,
        playersInRoom: connectedSockets.length,
        roomId: roomId.toString(),
      };

      return connectedPlayersData;
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to get rooms overview for user ${user._id}`;
      this.logger.error(errorMessage);
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handleGetPlayerRoomsOverview
   * @description gets connected players data for all rooms player is a part of
   */
  async handleGetPlayerRoomsOverview(
    socket: Socket,
    { socketServer, user }: IBaseSocketServiceParams
  ) {
    try {
      const playerRooms = await this.roomsService.findRoomsByPlayerRef(user._id);
      if (!playerRooms || !playerRooms.length) {
        return [];
      }

      const connectedPlayersData: IRoomMetadata[] = await Promise.all(
        playerRooms
          .map(async (room) => {
            return await this.handleGetRoomMetadata(
              {
                roomId: room._id,
                socketServer,
                user,
              },
              true
            );
          })
          .filter(Boolean)
      );

      return connectedPlayersData;
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to get rooms overview for user ${user._id}`;
      this.logger.error(errorMessage);
      const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      socket.emit(SocketEvent.GET_PLAYER_ROOMS_OVERVIEW_ERROR, errorData);
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handleJoinRoom
   * @description handles adding socket to existing room and notifying existing clients of the new member
   */
  async handleJoinRoom(
    socket: Socket,
    { roomId, socketServer, user }: ISocketServiceMethodParamsWithRoomId
  ) {
    try {
      const joinedRoomData = await this.roomsService.addPlayerToRoom({
        roomId,
        playerRef: user._id,
      });
      if (!joinedRoomData) {
        this.logger.error(`${socket.id} could not join room with id ${roomId}: Room not found`);
        const errorData = new SocketEventError(
          SocketEventErrorCode.NOT_FOUND,
          'Room not found. Check the room name and try again!',
          { roomId }
        );
        socket.emit(SocketEvent.JOIN_ROOM_ERROR, errorData);
        return;
      }
      if (socket.rooms.has(roomId)) {
        this.logger.warn(`${socket.id} already in room ${roomId}`);
      } else {
        socket.join(roomId);
      }
      const roomMetadata = await this.handleGetRoomMetadata({ roomId, socketServer, user }, true);
      socket.to(roomId).emit(SocketEvent.USER_JOINED_ROOM, {
        username: user.username,
        metadata: roomMetadata,
      });
      socket.emit(SocketEvent.JOIN_ROOM_SUCCESS, {
        room: joinedRoomData,
        metadata: roomMetadata,
      });
      return;
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to join room ${roomId} for user ${user._id}`;
      this.logger.error(errorMessage);
      const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      socket.emit(SocketEvent.JOIN_ROOM_ERROR, errorData);
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handleLeaveRoom
   * @description removes socket from room and handles calling proper helper to update local room storage data
   */
  async handleLeaveRoom(
    socket: Socket,
    { roomId, socketServer, user }: ISocketServiceMethodParamsWithRoomId
  ) {
    try {
      const roomData = await this.roomsService.findRoomByRef(roomId);
      if (!roomData) {
        this.logger.error(`${roomId}: Room not found`);
        const errorData = new SocketEventError(
          SocketEventErrorCode.NOT_FOUND,
          'Unable to leave room.',
          { roomId }
        );
        socket.emit(SocketEvent.LEAVE_ROOM_ERROR, errorData);
        return;
      }
      if (!socket.rooms.has(roomId)) {
        this.logger.warn(`${user._id} tried to leave ${roomId}: user already not in room`);
        return;
      }
      let roomMetadata: IRoomMetadata;
      if (roomData.hostRef === user._id) {
        socketServer.in(roomId).socketsLeave(roomId);
        roomMetadata = await this.handleGetRoomMetadata({ roomId, socketServer, user }, true);
      } else {
        socket.leave(roomId);
        roomMetadata = await this.handleGetRoomMetadata({ roomId, socketServer, user }, true);
        socket
          .to(roomId)
          .emit(SocketEvent.USER_LEFT_ROOM, { username: user.username, metadata: roomMetadata });
      }
      socket.emit(SocketEvent.LEAVE_ROOM_SUCCESS, {
        room: roomData,
        metadata: roomMetadata,
      });
      return;
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to leave room ${roomId} for user ${user._id}`;
      this.logger.error(errorMessage);
      const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      socket.emit(SocketEvent.LEAVE_ROOM_ERROR, errorData);
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handleCloseRoom
   * @description only host can close a room. closes all socket connections to room and anonymizes room data
   */
  async handleCloseRoom(
    socket: Socket,
    { roomId, socketServer, user }: ISocketServiceMethodParamsWithRoomId
  ) {
    try {
      const closedRoomData = await this.roomsService.closeRoom({ roomId, playerRef: user._id });
      if (!closedRoomData) {
        this.logger.error(`${roomId}: Room not found`);
        const errorData = new SocketEventError(
          SocketEventErrorCode.NOT_FOUND,
          'Unable to close room.',
          { roomId }
        );
        socket.emit(SocketEvent.CLOSE_ROOM_ERROR, errorData);
        return;
      }
      socketServer.in(roomId).socketsLeave(roomId);
      socket.emit(SocketEvent.CLOSE_ROOM_SUCCESS, { roomId });
      return;
    } catch (error) {
      const errorMessage = getCatchErrorMessage(error) ?? `Unable to close room ${roomId}`;
      this.logger.error(errorMessage);
      const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      socket.emit(SocketEvent.CLOSE_ROOM_ERROR, errorData);
      throw new WsException(errorMessage);
    }
  }

  // Add more methods for handling events, messages, etc.
}
