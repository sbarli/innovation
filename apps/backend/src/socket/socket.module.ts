import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { RoomsModule } from 'src/rooms/rooms.module';

import { SocketBaseService } from './services/socket-base.service';
import { SocketRoomService } from './services/socket-room.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [GamesModule, RoomsModule],
  providers: [SocketGateway, SocketBaseService, SocketRoomService],
})
export class SocketModule {}
