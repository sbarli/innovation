import { Logger } from '@nestjs/common';
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

import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
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

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody('roomId') roomId: string, @ConnectedSocket() socket: Socket) {
    return this.socketService.handleJoinRoom(socket, roomId);
  }

  // Implement other Socket.IO event handlers and message handlers
}