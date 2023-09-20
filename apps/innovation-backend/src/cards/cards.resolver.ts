import { Card } from 'src/shared/schemas/card.schema';
import { CardsService } from './cards.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CardsSortingService } from './cards-sorting.service';
import { CardRefsByAge } from './dto/card-refs-by-age.dto';
import { CardIdAndRefByAge } from './dto/cardId-and-ref-by-age.dto';
import { FindOneOptionsInput } from './dto/find-one-options.input';

@Resolver('cards-resolver')
export class CardsResolver {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cardsSortingService: CardsSortingService,
  ) {}

  @Query(() => [Card])
  async getAllCards(): Promise<Card[]> {
    const allCards = await this.cardsService.findAll();
    return allCards;
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
    options: FindOneOptionsInput,
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
