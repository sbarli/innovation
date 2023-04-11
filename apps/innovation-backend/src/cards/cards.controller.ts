import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Card } from 'src/shared/schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';

enum AgeString {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
}

const cardAgeToAgeStringMap: { [key: string]: AgeString } = {
  1: AgeString.ONE,
  2: AgeString.TWO,
  3: AgeString.THREE,
  4: AgeString.FOUR,
  5: AgeString.FIVE,
  6: AgeString.SIX,
  7: AgeString.SEVEN,
  8: AgeString.EIGHT,
  9: AgeString.NINE,
  10: AgeString.TEN,
};

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async getAllCards(
    @Query() query: { shape?: 'idsByAge' | 'byAge' | 'idAndRef' | 'refById' },
  ) {
    if (query.shape === 'idsByAge') {
      const cardRecs = await this.cardsService.findAll();
      return cardRecs.reduce(
        (acc, card) => {
          acc[cardAgeToAgeStringMap[card.age.toString()] as AgeString].push(
            card._id.toString(),
          );
          return acc;
        },
        {
          [AgeString.ONE]: [] as string[],
          [AgeString.TWO]: [] as string[],
          [AgeString.THREE]: [] as string[],
          [AgeString.FOUR]: [] as string[],
          [AgeString.FIVE]: [] as string[],
          [AgeString.SIX]: [] as string[],
          [AgeString.SEVEN]: [] as string[],
          [AgeString.EIGHT]: [] as string[],
          [AgeString.NINE]: [] as string[],
          [AgeString.TEN]: [] as string[],
        },
      );
    }
    if (query.shape === 'byAge') {
      const cardRecs = await this.cardsService.findAll();
      return cardRecs.reduce(
        (acc, card) => {
          const cardDataToReturn = {
            cardId: card.cardId,
            ref: card._id.toString(),
          };
          acc[cardAgeToAgeStringMap[card.age.toString()] as AgeString].push(
            cardDataToReturn,
          );
          return acc;
        },
        {
          [AgeString.ONE]: [] as { cardId: string; ref: string }[],
          [AgeString.TWO]: [] as { cardId: string; ref: string }[],
          [AgeString.THREE]: [] as { cardId: string; ref: string }[],
          [AgeString.FOUR]: [] as { cardId: string; ref: string }[],
          [AgeString.FIVE]: [] as { cardId: string; ref: string }[],
          [AgeString.SIX]: [] as { cardId: string; ref: string }[],
          [AgeString.SEVEN]: [] as { cardId: string; ref: string }[],
          [AgeString.EIGHT]: [] as { cardId: string; ref: string }[],
          [AgeString.NINE]: [] as { cardId: string; ref: string }[],
          [AgeString.TEN]: [] as { cardId: string; ref: string }[],
        },
      );
    }
    if (query.shape === 'refById') {
      const cardRecs = await this.cardsService.findAll();
      return cardRecs.reduce((acc, card) => {
        acc[card.cardId] = card._id.toString();
        return acc;
      }, {} as { [key: string]: string });
    }
    if (query.shape === 'idAndRef') {
      const cardRecs = await this.cardsService.findAll();
      return cardRecs.reduce((acc, card) => {
        const cardDataToReturn = {
          cardId: card.cardId,
          ref: card._id.toString(),
        };
        acc.push(cardDataToReturn);
        return acc;
      }, [] as { cardId: string; ref: string }[]);
    }
    return this.cardsService.findAll();
  }

  @Post()
  async seedCards(@Body() cards: CreateCardDto[]) {
    await this.cardsService.deleteAll();
    return this.cardsService.createMany(cards);
  }

  @Delete()
  async deleteAllCards() {
    return this.cardsService.deleteAll();
  }

  @Get(':id')
  async findCardById(@Param('id') id: string): Promise<Card | null> {
    return this.cardsService.findOneById(id);
  }
}
