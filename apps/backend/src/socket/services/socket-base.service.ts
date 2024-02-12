import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketBaseService {
  private logger: Logger = new Logger('SocketBaseService');
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor() {}

  /**
   * @name handleConnection
   * @description handles storing connected clients and diconnect logic
   */
  handleConnection(socket: Socket): void {
    const socketId = socket.id;
    this.logger.log(`Client connected: ${socketId}`);
    this.connectedClients.set(socketId, socket);

    socket.on('disconnect', () => {
      this.logger.log(`handling disconnect for ${socketId}`);
      this.connectedClients.delete(socketId);
    });
  }
}
