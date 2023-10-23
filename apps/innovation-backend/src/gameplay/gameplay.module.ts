import { Module } from '@nestjs/common';
import { CardsModule } from 'src/cards/cards.module';
import { GamesModule } from 'src/games/games.module';
import { PlayerGameDetailsModule } from 'src/player-game-details/player-game-details.module';
import { PlayersModule } from 'src/players/players.module';

import { GameplayResolver } from './gameplay.resolver';
import { NewGameService } from './services/new-game.service';

@Module({
  imports: [PlayersModule, CardsModule, GamesModule, PlayerGameDetailsModule],
  providers: [NewGameService, GameplayResolver],
})
export class GameplayModule {}
