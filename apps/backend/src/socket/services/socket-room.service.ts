import { Injectable } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import { SocketEvent } from '@inno/constants';

@Injectable()
export class SocketRoomService {
  joinRoom(client: Socket, roomId: string): void {
    void client.join(roomId);
  }

  leaveRoom(client: Socket, roomId: string): void {
    void client.leave(roomId);
  }

  broadcastToRoom(server: Server, roomId: string, event: SocketEvent, data: unknown): void {
    server.to(roomId).emit(event, data);
  }
}
