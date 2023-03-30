import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePlayerGameDetailsDto } from './dto/create-player-game-details.dto';
import { PlayerGameDetails } from './schemas/player-game-details.schema';
import { PlayerGameDetailsService } from './player-game-details.service';
import { UpdatePlayerGameDetailsDto } from './dto/update-player-game-details.dto';

@Controller('games/:gameId/players/:playerId/details')
export class PlayerGameDetailsController {
  constructor(
    private readonly playerGameDetailsService: PlayerGameDetailsService,
  ) {}

  @Get()
  async find(
    @Param('gameId') gameId: string,
    @Param('playerId') playerId: string,
  ): Promise<PlayerGameDetails | null> {
    return this.playerGameDetailsService.findDetailsByGameAndPlayer({
      gameId,
      playerId,
    });
  }

  @Post()
  async create(
    @Param('gameId') gameId: string,
    @Param('playerId') playerId: string,
    @Body() createPlayerGameDetailsDto: CreatePlayerGameDetailsDto,
  ) {
    const existingPlayerGameDetails =
      await this.playerGameDetailsService.findDetailsByGameAndPlayer({
        gameId,
        playerId,
      });
    console.log('existingPlayerGameDetails: ', existingPlayerGameDetails);
    // TODO: better handle error here
    if (existingPlayerGameDetails) {
      throw new Error(
        'This player already has game details. Did you mean to update?',
      );
    }
    return this.playerGameDetailsService.create({
      gameId,
      playerId,
      details: createPlayerGameDetailsDto,
    });
  }

  @Get(':detailsId')
  async findById(@Param('detailsId') detailsId: string) {
    return this.playerGameDetailsService.findById(detailsId);
  }

  @Put(':detailsId')
  async update(
    @Param('detailsId') detailsId: string,
    @Body() updatePlayerGameDetailsDto: UpdatePlayerGameDetailsDto,
  ) {
    return this.playerGameDetailsService.updateById({
      id: detailsId,
      updates: updatePlayerGameDetailsDto,
    });
  }
}
