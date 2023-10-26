import { Controller, Get } from '@nestjs/common';

import { CardsService } from './services/cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async seedCards() {
    return this.cardsService.seedCards();
  }
}
