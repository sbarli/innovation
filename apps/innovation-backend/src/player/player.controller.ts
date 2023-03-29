import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './player.schema';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playerService.create(createPlayerDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Player | null> {
    return this.playerService.findOneById(id);
  }
}
