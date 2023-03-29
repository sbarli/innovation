import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './schemas/card.schema';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createMany(@Body() cards: CreateCardDto[]) {
    await this.cardsService.createMany(cards);
  }

  @Delete()
  async deleteAll() {
    await this.cardsService.deleteAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Card | null> {
    return this.cardsService.findOneById(id);
  }
}
