import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './schemas/player.schema';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const existingPlayersWithId = await this.playerService.findByPlayerId(
      createPlayerDto.playerId,
    );
    if (existingPlayersWithId?.length) {
      throw new Error('Unable to create player with this playerId');
    }
    return this.playerService.create(createPlayerDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Player | null> {
    return this.playerService.findOneById(id);
  }
}
