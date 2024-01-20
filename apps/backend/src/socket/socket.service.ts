import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Socket } from 'socket.io';

import { getCatchErrorMessage } from '@inno/utils';

export type Room = {
  roomId: string;
  host: string;
  clientsInRoom: string[];
};

@Injectable()
export class SocketService {
  private logger: Logger = new Logger('SocketService');
  private readonly connectedClients: Map<string, Socket> = new Map();
  private readonly rooms: Map<string, Room> = new Map();

  /**
   * @name handleDisconnectedRoomHost
   * @description handles room where the disconnected user was the host
   *  if user was the only remaining client in the room, delete the room
   *  otherwise, make next client in room the host
   */
  handleDisconnectedRoomHost(socket: Socket, roomId: string, room?: Room) {
    const roomData = room ?? this.rooms.get(roomId);
    if (!roomData) {
      this.logger.warn(`could not remove ${socket.id} as host of room ${roomId}: room not found`);
      return;
    }
    const remainingClientsInRoom = roomData.clientsInRoom.filter(
      (clientId) => clientId !== socket.id
    );
    if (remainingClientsInRoom.length) {
      this.rooms.set(roomId, {
        ...roomData,
        host: remainingClientsInRoom[0],
        clientsInRoom: remainingClientsInRoom,
      });
      socket.to(roomId).emit('hostLeftRoomNewHostAssigned', {
        oldHost: socket.id,
        newHost: remainingClientsInRoom[0],
      });
      return;
    }
    this.rooms.delete(roomId);
    return;
  }

  /**
   * @name handleDisconnectedRoomGuest
   * @description handles removing user as a client in a room
   */
  handleDisconnectedRoomGuest(socket: Socket, roomId: string, room?: Room) {
    const roomData = room ?? this.rooms.get(roomId);
    if (!roomData) {
      this.logger.warn(`could not remove ${socket.id} from room ${roomId}: room not found`);
      return;
    }
    const remainingClientsInRoom = roomData.clientsInRoom.filter(
      (clientId) => clientId !== socket.id
    );
    this.rooms.set(roomId, {
      ...roomData,
      clientsInRoom: remainingClientsInRoom,
    });
    socket.to(roomId).emit('userLeftRoom', {
      clientId: socket.id,
    });
    return;
  }

  /**
   * @name handleRemoveDisconnectedUserFromAllRooms
   * @description handles removing disconnected users from all rooms they are connected to
   *  if they are host, calls @handleDisconnectedRoomHost to handlee new host logic
   *  otherwise, simply removes the user from the room client list
   */
  handleRemoveDisconnectedUserFromAllRooms(socket: Socket) {
    this.rooms.forEach((room, roomId) => {
      if (room.host === socket.id) {
        return this.handleDisconnectedRoomHost(socket, roomId, room);
      }
      if (room.clientsInRoom.includes(socket.id)) {
        return this.handleDisconnectedRoomGuest(socket, roomId, room);
      }
    });
  }

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
      this.handleRemoveDisconnectedUserFromAllRooms(socket);
      this.connectedClients.delete(clientId);
    });
  }

  /**
   * @name handleCreateRoom
   * @description creats a new room if room does not currently exist
   */
  handleCreateRoom(socket: Socket, roomId: string) {
    try {
      if (this.rooms.has(roomId)) {
        this.logger.error(`could not create room with id ${roomId}: Room already exists`);
        throw new Error(`could not create room with id ${roomId}: Room already exists`);
      }
      this.rooms.set(roomId, { roomId, host: socket.id, clientsInRoom: [] });
      return this.handleJoinRoom(socket, roomId, true);
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ??
        `handleCreateRoom: Unable to create room ${roomId} for socket user ${socket.id}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * @name handleJoinRoom
   * @description handles adding socket to existing room and notifying existing clients of the new member
   */
  handleJoinRoom(socket: Socket, roomId: string, newRoom: boolean = false) {
    try {
      const roomData = this.rooms.get(roomId);
      if (!roomData) {
        this.logger.error(`${socket.id} could not join room with id ${roomId}: Room not found`);
        throw new NotFoundException(`Room ${roomId} not found`);
      }
      if (socket.rooms.has(roomId)) {
        this.logger.warn(`${socket.id} already in room ${roomId}`);
        return { event: 'socketInRoom', roomId };
      }
      this.rooms.set(roomId, {
        ...roomData,
        clientsInRoom: [...roomData.clientsInRoom, socket.id],
      });
      socket.join(roomId);
      if (newRoom) {
        socket.to(roomId).emit('roomCreated');
      }
      socket.to(roomId).emit('userJoinedRoom', { clientId: socket.id });
      return { event: 'roomJoined', roomId };
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to join room for socket user ${socket.id}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * @name handleLeaveRoom
   * @description removes socket from room and handles calling proper helper to update local room storage data
   */
  handleLeaveRoom(socket: Socket, roomId: string) {
    try {
      const roomData = this.rooms.get(roomId);
      if (!roomData) {
        this.logger.error(`${roomId}: Room not found`);
        throw new NotFoundException(`Room ${roomId} not found`);
      }
      if (!socket.rooms.has(roomId)) {
        this.logger.error(`${socket.id} is not in room ${roomId}`);
        throw new Error(`${socket.id} is already not in room ${roomId}`);
      }
      socket.leave(roomId);
      if (roomData.host == socket.id) {
        return this.handleDisconnectedRoomHost(socket, roomId, roomData);
      }
      this.handleDisconnectedRoomGuest(socket, roomId, roomData);
      return { event: 'leftRoom', roomId };
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `Unable to leave room for socket user ${socket.id}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Add more methods for handling events, messages, etc.
}
