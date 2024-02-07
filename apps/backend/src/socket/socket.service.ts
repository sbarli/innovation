import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomsService } from 'src/rooms/rooms.service';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { SocketEvent, SocketEventError, SocketEventErrorCode } from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

export interface IHandleGetPlayerRoomsOverviewParams {
  socketServer: Socket;
  user: UserWithoutPassword;
}

export interface IHandleCreateRoomParams {
  roomName: string;
  user: UserWithoutPassword;
}

export interface IHandleJoinRoomParams {
  roomId: string;
  user: UserWithoutPassword;
}

export interface IHandleLeaveRoomParams {
  roomId: string;
  user: UserWithoutPassword;
  socketServer: Socket;
}

export interface IHandleCloseRoomParams {
  roomId: string;
  user: UserWithoutPassword;
  socketServer: Socket;
}

@Injectable()
export class SocketService {
  private logger: Logger = new Logger('SocketService');
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(private readonly roomsService: RoomsService) {}

  /**
   * @name handleConnection
   * @description handles storing connected clients and diconnect logic
   */
  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.logger.log(`Client connected: ${clientId}`);
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.logger.log(`handling disconnect for ${clientId}`);
      this.connectedClients.delete(clientId);
    });
  }

  /**
   * @name handleGetPlayerRoomsOverview
   * @description gets connected players data for all rooms player is a part of
   */
  async handleGetPlayerRoomsOverview(
    socket: Socket,
    { socketServer, user }: IHandleGetPlayerRoomsOverviewParams
  ) {
    try {
      const playerRooms = await this.roomsService.findRoomsByPlayerRef(user._id);
      if (!playerRooms || !playerRooms.length) {
        return [];
      }

      const connectedPlayersData = await Promise.all(
        playerRooms.map(async (room) => {
          const connectedSockets = await socketServer.in(room._id.toString()).fetchSockets();
          return {
            roomId: room._id.toString(),
            playersInRoom: connectedSockets.length,
          };
        })
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
  async handleJoinRoom(socket: Socket, { roomId, user }: IHandleJoinRoomParams) {
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
      socket.to(roomId).emit(SocketEvent.USER_JOINED_ROOM, { username: user.username });
      socket.emit(SocketEvent.JOIN_ROOM_SUCCESS, joinedRoomData);
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
  async handleLeaveRoom(socket: Socket, { roomId, socketServer, user }: IHandleLeaveRoomParams) {
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
      if (roomData.hostRef === user._id) {
        socketServer.in(roomId).socketsLeave(roomId);
      } else {
        socket.to(roomId).emit(SocketEvent.USER_LEFT_ROOM, { username: user.username });
        socket.leave(roomId);
      }
      socket.emit(SocketEvent.LEAVE_ROOM_SUCCESS, roomData);
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
  async handleCloseRoom(socket: Socket, { roomId, socketServer, user }: IHandleCloseRoomParams) {
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
