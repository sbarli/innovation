import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { SocketEvent } from '@inno/constants';
import { SocketRoomService } from './services/socket-room.service';
import { SocketUsersService } from './services/socket-users.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SocketGateway.name);

  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly configService: ConfigService,
    private readonly socketUsersService: SocketUsersService,
    private readonly socketRoomService: SocketRoomService,
  ) {}

  afterInit(): void {
    this.logger.log('WebSocket gateway initialized');
  }

  handleConnection(client: Socket): void {
    const token = client.handshake.auth?.['token'] as string | undefined;
    if (!token) {
      client.disconnect(true);
      return;
    }

    const secret = this.configService.get<string>('SUPABASE_JWT_SECRET');
    if (!secret) { client.disconnect(true); return; }

    try {
      const payload = jwt.verify(token, secret) as jwt.JwtPayload;
      client.data['user'] = { userId: payload['sub'] as string, email: payload['email'] as string };
      this.logger.log(`Client connected: ${client.id}`);
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket): void {
    this.socketUsersService.removeSocket(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(SocketEvent.MAP_USER_TO_SOCKET)
  handleMapUser(client: Socket): void {
    const user = client.data['user'] as { userId: string } | undefined;
    if (user) {
      this.socketUsersService.mapUserToSocket(user.userId, client.id);
    }
  }

  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  handleJoinRoom(client: Socket, roomId: string): void {
    this.socketRoomService.joinRoom(client, roomId);
    this.socketRoomService.broadcastToRoom(this.server, roomId, SocketEvent.USER_JOINED_ROOM, {
      userId: (client.data['user'] as { userId: string } | undefined)?.userId,
      roomId,
    });
  }

  @SubscribeMessage(SocketEvent.CLOSE_ROOM)
  handleCloseRoom(client: Socket, roomId: string): void {
    this.socketRoomService.broadcastToRoom(this.server, roomId, SocketEvent.USER_LEFT_ROOM, { roomId });
    this.socketRoomService.leaveRoom(client, roomId);
  }

  @SubscribeMessage(SocketEvent.GET_ROOM_METADATA)
  handleGetRoomMetadata(client: Socket, roomId: string): void {
    client.emit(SocketEvent.GET_ROOM_METADATA, { roomId });
  }
}
