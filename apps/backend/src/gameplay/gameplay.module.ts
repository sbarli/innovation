import { Module } from '@nestjs/common';
import { CardsModule } from 'src/cards/cards.module';
import { GamesModule } from 'src/games/games.module';
import { PlayerGameDetailsModule } from 'src/player-game-details/player-game-details.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';

import { GameplayResolver } from './gameplay.resolver';
import { NewGameService } from './services/new-game.service';
import { PlayerActionsService } from './services/player-actions.service';
import { VaildationService } from './services/validation.service';

@Module({
  imports: [UsersModule, CardsModule, GamesModule, PlayerGameDetailsModule, RoomsModule],
  providers: [VaildationService, PlayerActionsService, NewGameService, GameplayResolver],
  exports: [PlayerActionsService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GameplayModule {}
