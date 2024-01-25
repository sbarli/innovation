import { Module } from '@nestjs/common';
import { RoomsModule } from 'src/rooms/rooms.module';

import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [RoomsModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
