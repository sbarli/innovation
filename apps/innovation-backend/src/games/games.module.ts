import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';
import { Game, GameSchema } from './schemas/game.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }])],
  providers: [GamesService, GamesResolver],
  exports: [GamesService],
})
export class GamesModule {}
