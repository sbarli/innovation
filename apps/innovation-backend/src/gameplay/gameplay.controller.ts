import { Body, Controller, Post } from '@nestjs/common';
import { GameplayService } from './gameplay.service';
import { NewGameDto } from './dto/new-game.dto';

@Controller('gameplay')
export class GameplayController {
  constructor(private readonly gameplayService: GameplayService) {}

  @Post('/new')
  async createNewGame(@Body() newGameDto: NewGameDto) {
    return this.gameplayService.newGame(newGameDto);
  }
}
