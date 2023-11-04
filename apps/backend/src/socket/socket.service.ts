import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

import { getCatchErrorMessage } from '@inno/utils';

@Injectable()
export class SocketService {
  private logger: Logger = new Logger('SocketService');
  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.logger.log(`Client connected: ${clientId}`);
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.logger.log(`handling disconnect for ${clientId}`);
      this.connectedClients.delete(clientId);
    });
  }

  handleJoinRoom(socket: Socket, roomId: string) {
    try {
      if (socket.rooms.has(roomId)) {
        this.logger.warn(`${socket.id} already in room ${roomId}`);
        return { event: 'socketInRoom', roomId };
      }
      socket.join(roomId);
      socket.to(roomId).emit('userJoinedRoom', { clientId: socket.id });
      return { event: 'roomJoined', roomId };
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ??
        `handleJoinRoom: Unable to join room for socket user ${socket.id}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Add more methods for handling events, messages, etc.
}
