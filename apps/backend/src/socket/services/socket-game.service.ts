import { Injectable } from '@nestjs/common';
import type { Server } from 'socket.io';
import { SocketEvent } from '@inno/constants';
import { SocketUsersService } from './socket-users.service';

export interface GameStatePayload {
  game: unknown;
  playerDetails: unknown[];
}

@Injectable()
export class SocketGameService {
  constructor(private readonly socketUsersService: SocketUsersService) {}

  broadcastGameStarted(
    server: Server,
    roomId: string,
    playerPayloads: Map<string, GameStatePayload>,
  ): void {
    this.broadcastPerPlayer(server, roomId, SocketEvent.GAME_STARTED, playerPayloads);
  }

  broadcastGameUpdated(
    server: Server,
    roomId: string,
    playerPayloads: Map<string, GameStatePayload>,
  ): void {
    this.broadcastPerPlayer(server, roomId, SocketEvent.GAME_UPDATED, playerPayloads);
  }

  private broadcastPerPlayer(
    server: Server,
    roomId: string,
    event: SocketEvent,
    playerPayloads: Map<string, GameStatePayload>,
  ): void {
    for (const [playerId, payload] of playerPayloads) {
      const socketId = this.socketUsersService.getSocketIdForUser(playerId);
      if (socketId) {
        server.to(socketId).emit(event, payload);
      } else {
        // Fallback: broadcast to the room (player will receive without hand filtering)
        server.to(roomId).emit(event, payload);
      }
    }
  }
}
