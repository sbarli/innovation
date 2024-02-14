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
  SocketEventResponse,
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
export interface IHandleCloseRoomParams {
  roomId: string;
  socketServer: Socket;
  user?: UserWithoutPassword;
}

@Injectable()
export class SocketRoomService {
  private logger: Logger = new Logger('SocketRoomService');

  constructor(
    private readonly gamesService: GamesService,
    private readonly roomsService: RoomsService
  ) {}

  /**
   * @name handleJoinRoom
   * @description handles adding socket to existing room that user is a player/host of and notifying existing clients of the new member
   */
  async handleJoinRoom(
    socket: Socket,
    { roomId, socketServer, user }: ISocketServiceMethodParamsWithRoomId
  ) {
    try {
      const room = await this.roomsService.findRoomByRef(roomId);
      if (!room) {
        this.logger.error(`${user._id} could not join room ${roomId}: Room not found`);
        const errorData = new SocketEventError(SocketEventErrorCode.NOT_FOUND, 'Room not found', {
          roomId,
        });
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }
      const roomIsOpen = room.availableToJoin;
      const userIsRoomMember =
        room.hostRef?.toString() === user._id.toString() ||
        room.playerRefs.map((ref) => ref.toString()).includes(user._id.toString());
      if (!roomIsOpen || !userIsRoomMember) {
        this.logger.error(
          `${user._id} could not join room ${roomId}: ${
            !roomIsOpen ? 'Room is closed' : 'User is not member of room'
          }`
        );
        const errorData = new SocketEventError(SocketEventErrorCode.INVALID, 'User cannot join', {
          roomId,
        });
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }
      if (socket.rooms.has(roomId)) {
        this.logger.warn(`${user._id} already in room ${roomId}`);
      } else {
        socket.join(roomId);
      }
      const roomMetadata = await this.handleGetRoomMetadata({ roomId, socketServer, user }, true);
      socket.to(roomId).emit(SocketEvent.USER_JOINED_ROOM, {
        username: user.username,
        metadata: roomMetadata,
      });
      return new SocketEventResponse({
        success: true,
        data: {
          room,
          metadata: roomMetadata.data ? (roomMetadata.data as IRoomMetadata) : {},
        },
      });
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `${user._id} could not join room ${roomId}: Unknown reason`;
      this.logger.error(errorMessage);
      const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      socket.emit(SocketEvent.JOIN_ROOM_ERROR, {
        error: errorData,
      });
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handleGetRoomMetadata
   * @description gets metadata for specified room
   */
  async handleGetRoomMetadata(
    { roomId, socketServer }: ISocketServiceMethodParamsWithRoomId,
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

      return new SocketEventResponse({
        success: true,
        data: connectedPlayersData,
      });
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to get metadata for room ${roomId}`;
      this.logger.error(errorMessage);
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handleCloseRoom
   * @description closes all socket connections to room and anonymizes room data
   */
  async handleCloseRoom(
    socket: Socket,
    { roomId, socketServer, user }: IHandleCloseRoomParams,
    silenceSocketEmits: boolean = false
  ) {
    const connectedSockets = await socketServer.in(roomId).fetchSockets();
    socketServer.to(roomId).emit(SocketEvent.CLOSE_ROOM_IN_PROGRESS, {
      roomId,
      intiatedBy: user?.username ?? 'User',
    });
    try {
      socketServer.in(roomId).socketsLeave(roomId);
      connectedSockets.forEach((roomLeftSocket) => {
        roomLeftSocket.emit(SocketEvent.CLOSE_ROOM_SUCCESS, {
          roomId,
          closedBy: user?.username ?? 'User',
        });
      });
      return new SocketEventResponse({
        success: true,
        data: {
          closedRoomId: roomId,
        },
      });
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to close room ${roomId}: Unknown reason`;
      this.logger.error(errorMessage);
      const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      if (!silenceSocketEmits) {
        socket.emit(SocketEvent.CLOSE_ROOM_ERROR, { error: errorData });
      }
      throw new WsException(errorMessage);
    }
  }

  // Add more methods for handling events, messages, etc.
}
