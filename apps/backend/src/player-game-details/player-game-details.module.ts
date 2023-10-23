import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayerGameDetailsResolver } from './player-game-details.resolver';
import { PlayerGameDetailsService } from './player-game-details.service';
import { PlayerGameDetails, PlayerGameDetailsSchema } from './schemas/player-game-details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlayerGameDetails.name, schema: PlayerGameDetailsSchema }]),
  ],
  providers: [PlayerGameDetailsService, PlayerGameDetailsResolver],
  exports: [PlayerGameDetailsService],
})
export class PlayerGameDetailsModule {}
