import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlayerGameDetails,
  PlayerGameDetailsSchema,
} from './schemas/player-game-details.schema';
import { PlayerGameDetailsService } from './player-game-details.service';
import { PlayerGameDetailsResolver } from './player-game-details.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerGameDetails.name, schema: PlayerGameDetailsSchema },
    ]),
  ],
  providers: [PlayerGameDetailsService, PlayerGameDetailsResolver],
})
export class PlayerGameDetailsModule {}
