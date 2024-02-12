import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { RoomsModule } from 'src/rooms/rooms.module';

import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [GamesModule, RoomsModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
