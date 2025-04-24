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

import { SocketEvent } from '@inno/constants';

import { CurrentUserFromRequest } from 'src/auth/decorators/current-user.decorator';
import { JwtWsAuthGuard } from 'src/auth/guards/jwt-ws-auth.guard';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { SocketBaseService } from './services/socket-base.service';
import { SocketGameService } from './services/socket-game.service';
import { SocketRoomService } from './services/socket-room.service';
import { SocketUsersService } from './services/socket-users.service';

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

  constructor(
    private readonly socketBaseService: SocketBaseService,
    private readonly socketGameService: SocketGameService,
    private readonly socketRoomService: SocketRoomService,
    private readonly socketUsersService: SocketUsersService
  ) {}

  afterInit() {
    this.logger.log('initialized');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    return this.socketBaseService.handleConnection(socket, { socketServer: this.server });
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.MAP_USER_TO_SOCKET)
  mapUserToSocket(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    @ConnectedSocket() socket: Socket
  ) {
    return this.socketUsersService.handleSocketToUserMap(socket, {
      user,
    });
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  joinRoom(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() socket: Socket
  ) {
    return this.socketRoomService.handleJoinRoom(socket, {
      roomId,
      socketServer: this.server,
      user,
    });
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.GET_ROOM_METADATA)
  getRoomMetadata(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    @MessageBody('roomId') roomId: string
  ) {
    return this.socketRoomService.handleGetRoomMetadata({
      roomId,
      socketServer: this.server,
      user,
    });
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.CLOSE_ROOM)
  closeRoom(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() socket: Socket
  ) {
    return this.socketRoomService.handleCloseRoom(socket, {
      roomId,
      socketServer: this.server,
      user,
    });
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.START_GAME)
  startGame(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    @MessageBody('gameId') gameId: string,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() socket: Socket
  ) {
    return this.socketGameService.handleStartGame(socket, {
      gameId,
      roomId,
      socketServer: this.server,
      user,
    });
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.STARTER_CARD_MELDED)
  starterCardMelded(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    // @MessageBody('gameId') gameId: string,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() socket: Socket
  ) {
    return this.socketGameService.handleStarterCardMelded(socket, {
      // gameId,
      roomId,
      socketServer: this.server,
      user,
    });
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.MELD_CARD_FROM_HAND)
  meldCardFromHand(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    @MessageBody('cardId') cardId: string,
    @MessageBody('gameId') gameId: string,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() socket: Socket
  ) {
    return this.socketGameService.handleMeldCardFromHand(socket, {
      cardId,
      gameId,
      roomId,
      socketServer: this.server,
      user,
    });
  }

  // Implement other Socket.IO event handlers and message handlers
}
