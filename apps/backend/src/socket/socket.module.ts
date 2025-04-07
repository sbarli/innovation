import { Module } from '@nestjs/common';
import { GameplayModule } from 'src/gameplay/gameplay.module';
import { GamesModule } from 'src/games/games.module';
import { RoomsModule } from 'src/rooms/rooms.module';

import { SocketBaseService } from './services/socket-base.service';
import { SocketGameService } from './services/socket-game.service';
import { SocketRoomService } from './services/socket-room.service';
import { SocketUsersService } from './services/socket-users.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [GameplayModule, GamesModule, RoomsModule],
  providers: [
    SocketGateway,
    SocketBaseService,
    SocketGameService,
    SocketRoomService,
    SocketUsersService,
  ],
})
export class SocketModule {}
