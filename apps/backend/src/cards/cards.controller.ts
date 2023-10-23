import { Body, Controller, Delete, Post } from '@nestjs/common';

import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './services/cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async seedCards(@Body() cards: CreateCardDto[]) {
    await this.cardsService.deleteAll();
    return this.cardsService.createMany(cards);
  }

  @Delete()
  async deleteAllCards() {
    return this.cardsService.deleteAll();
  }
}
