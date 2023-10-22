import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayersResolver } from './players.resolver';
import { PlayersService } from './players.service';
import { Player, PlayerSchema } from './schemas/player.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }])],
  providers: [PlayersService, PlayersResolver],
  exports: [PlayersService],
})
export class PlayersModule {}
