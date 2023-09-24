import { Module } from '@nestjs/common';
import { NewGameService } from './services/new-game.service';
import { PlayersModule } from 'src/players/players.module';
import { CardsModule } from 'src/cards/cards.module';
import { GamesModule } from 'src/games/games.module';
import { GameplayResolver } from './gameplay.resolver';
import { PlayerGameDetailsModule } from 'src/player-game-details/player-game-details.module';

@Module({
  imports: [PlayersModule, CardsModule, GamesModule, PlayerGameDetailsModule],
  providers: [NewGameService, GameplayResolver],
})
export class GameplayModule {}
