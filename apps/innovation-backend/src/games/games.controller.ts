import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { SetWinnerDto } from './dto/set-winner.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    await this.gamesService.create(createGameDto);
  }

  @Get(':gameId')
  async findById(@Param('gameId') gameId: string): Promise<Game | null> {
    return this.gamesService.findOneById(gameId);
  }

  @Put(':gameId')
  async update(
    @Param('gameId') gameId: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.updateById({
      id: gameId,
      gameUpdates: updateGameDto,
    });
  }

  @Put(':gameId/winner')
  async setWinner(
    @Param('gameId') gameId: string,
    @Body() setWinnerDto: SetWinnerDto,
  ) {
    return this.gamesService.updateById({
      id: gameId,
      gameUpdates: setWinnerDto,
    });
  }
}
