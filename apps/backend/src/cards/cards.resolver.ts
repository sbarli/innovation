import { Args, Query, Resolver } from '@nestjs/graphql';

import { CardRefsByAge } from './dto/card-refs-by-age.dto';
import { CardIdAndRefByAge } from './dto/cardId-and-ref-by-age.dto';
import { FindOneOptionsInput } from './dto/find-one-options.input';
import { Card } from './schemas/card.schema';
import { CardsSortingService } from './services/cards-sorting.service';
import { CardsService } from './services/cards.service';

@Resolver('cards-resolver')
export class CardsResolver {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cardsSortingService: CardsSortingService
  ) {}

  @Query(() => [Card])
  async getAllCards(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Query(() => CardRefsByAge)
  async getCardRefsByAge(): Promise<CardRefsByAge> {
    const cards = await this.cardsService.findAll();
    return this.cardsSortingService.refsByAge({ cards });
  }

  @Query(() => CardIdAndRefByAge)
  async getCardIdAndRefByAge(): Promise<CardIdAndRefByAge> {
    const cards = await this.cardsService.findAll();
    return this.cardsSortingService.cardIdAndRefByAge({ cards });
  }

  @Query(() => Card, { nullable: true })
  async getOneCard(
    @Args('options', { type: () => FindOneOptionsInput })
    options: FindOneOptionsInput
  ): Promise<Card | null | undefined> {
    switch (options.searchField) {
      case 'cardId':
        return this.cardsService.findOneByCardId(options.searchValue);
      case 'ref':
        return this.cardsService.findOneByRef(options.searchValue);
      default:
        throw new Error('Invalid searchField provided');
    }
  }
}
