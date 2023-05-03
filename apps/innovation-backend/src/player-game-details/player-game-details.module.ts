import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerGameDetailsController } from './player-game-details.controller';
import {
  PlayerGameDetails,
  PlayerGameDetailsSchema,
} from './schemas/player-game-details.schema';
import { PlayerGameDetailsService } from './player-game-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerGameDetails.name, schema: PlayerGameDetailsSchema },
    ]),
  ],
  controllers: [PlayerGameDetailsController],
  providers: [PlayerGameDetailsService],
})
export class PlayerGameDetailsModule {}
