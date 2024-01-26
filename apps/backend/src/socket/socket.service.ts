import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomsService } from 'src/rooms/rooms.service';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { SocketEvent, SocketEventError, SocketEventErrorCode } from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

export type Room = {
  roomId: string;
  host: string;
  clientsInRoom: string[];
};

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
   * @name handleJoinRoom
   * @description handles adding socket to existing room and notifying existing clients of the new member
   */
  async handleJoinRoom(socket: Socket, { roomId, user }: IHandleJoinRoomParams) {
    try {
      const joinedRoomData = await this.roomsService.addPlayerToRoom(roomId, user._id);
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
        const errorData = new SocketEventError(
          SocketEventErrorCode.DUPE,
          'You are already in this room!',
          { roomId }
        );
        socket.emit(SocketEvent.JOIN_ROOM_ERROR, errorData);
        return;
      }
      socket.join(roomId);
      socket.to(roomId).emit(SocketEvent.USER_JOINED_ROOM, { username: user.displayName });
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
  async handleLeaveRoom(socket: Socket, { roomId, user }: IHandleLeaveRoomParams) {
    try {
      const roomLeftData = await this.roomsService.removePlayerFromRoom(roomId, user._id);
      if (!roomLeftData) {
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
      socket.leave(roomId);
      socket.emit(SocketEvent.LEAVE_ROOM_SUCCESS, roomLeftData);
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

  // Add more methods for handling events, messages, etc.
}
