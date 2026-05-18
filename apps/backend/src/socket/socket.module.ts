import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketGameService } from './services/socket-game.service';
import { SocketRoomService } from './services/socket-room.service';
import { SocketUsersService } from './services/socket-users.service';

@Module({
  providers: [SocketGateway, SocketUsersService, SocketRoomService, SocketGameService],
  exports: [SocketUsersService, SocketRoomService, SocketGameService],
})
export class SocketModule {}
