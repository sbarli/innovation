import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';

import { PlayerGameDetailsResolver } from './player-game-details.resolver';
import { PlayerGameDetailsService } from './player-game-details.service';
import { PlayerGameDetails, PlayerGameDetailsSchema } from './schemas/player-game-details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlayerGameDetails.name, schema: PlayerGameDetailsSchema }]),
    UsersModule,
  ],
  providers: [PlayerGameDetailsService, PlayerGameDetailsResolver],
  exports: [PlayerGameDetailsService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PlayerGameDetailsModule {}
