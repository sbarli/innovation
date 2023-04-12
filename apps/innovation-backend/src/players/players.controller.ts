import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './schemas/player.schema';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const existingPlayersWithId = await this.playersService.findByPlayerId(
      createPlayerDto.playerId,
    );
    if (existingPlayersWithId?.length) {
      throw new Error('Unable to create player with this playerId');
    }
    return this.playersService.create(createPlayerDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Player | null> {
    return this.playersService.findOneById(id);
  }
}
