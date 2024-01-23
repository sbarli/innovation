import { Logger, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtWsAuthGuard } from 'src/auth/guards/jwt-ws-auth.guard';

import { SocketEvent } from '@inno/constants';

import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // NOTE: this has to be delcared for websockets to work, but isn't necessary to use 🤷🏼‍♂️
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @WebSocketServer() private server!: Socket;
  private logger: Logger = new Logger('SocketGateway');

  constructor(private readonly socketService: SocketService) {}

  afterInit() {
    this.logger.log('initialized');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    return this.socketService.handleConnection(socket);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.CREATE_ROOM)
  createRoom(@MessageBody('roomId') roomId: string, @ConnectedSocket() socket: Socket) {
    return this.socketService.handleCreateRoom(socket, roomId);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  joinRoom(@MessageBody('roomId') roomId: string, @ConnectedSocket() socket: Socket) {
    return this.socketService.handleJoinRoom(socket, roomId);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.LEAVE_ROOM)
  leaveRoom(@MessageBody('roomId') roomId: string, @ConnectedSocket() socket: Socket) {
    return this.socketService.handleLeaveRoom(socket, roomId);
  }

  // Implement other Socket.IO event handlers and message handlers
}
