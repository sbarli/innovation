import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CardsModule } from '../cards/cards.module';
import { GamesModule } from '../games/games.module';
import { RoomsModule } from '../rooms/rooms.module';
import { SocketModule } from '../socket/socket.module';
import { GameplayController } from './gameplay.controller';
import { NewGameService } from './services/new-game.service';
import { PlayerActionsService } from './services/player-actions.service';
import { ResourcesService } from './services/resources.service';
import { ValidationService } from './services/validation.service';
import { WinnerService } from './services/winner.service';

@Module({
  imports: [AuthModule, CardsModule, GamesModule, RoomsModule, SocketModule],
  controllers: [GameplayController],
  providers: [
    NewGameService,
    PlayerActionsService,
    ResourcesService,
    ValidationService,
    WinnerService,
  ],
})
export class GameplayModule {}
