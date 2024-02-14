import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

import { SocketRoomService } from './socket-room.service';

@Injectable()
export class SocketBaseService {
  private logger: Logger = new Logger('SocketBaseService');
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(private readonly socketRoomService: SocketRoomService) {}

  /**
   * @name handleConnection
   * @description handles storing connected clients and diconnect logic
   */
  handleConnection(socket: Socket, { socketServer }: { socketServer: Socket }): void {
    const socketId = socket.id;
    this.logger.log(`Client connected: ${socketId}`);
    this.connectedClients.set(socketId, socket);

    socket.on('disconnect', () => {
      this.logger.log(`Client disconnected: ${socketId}`);
      this.connectedClients.delete(socketId);
      // close all rooms this socket was a member of
      socket.rooms.forEach((room) => {
        this.socketRoomService.handleCloseRoom(socket, { roomId: room, socketServer }, true);
      });
    });
  }
}
