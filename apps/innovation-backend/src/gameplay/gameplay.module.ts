import { Module } from '@nestjs/common';
import { GameplayController } from './gameplay.controller';
import { GameplayService } from './gameplay.service';
import { PlayersModule } from 'src/players/players.module';
import { CardsModule } from 'src/cards/cards.module';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [PlayersModule, CardsModule, GamesModule],
  controllers: [GameplayController],
  providers: [GameplayService],
})
export class GameplayModule {}
