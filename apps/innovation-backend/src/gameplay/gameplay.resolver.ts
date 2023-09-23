import { NewGameService } from './services/new-game.service';
import { CreateNewGameInput } from './dto/create-new-game.input.dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateNewGameResponse } from './dto/create-new-game.output.dto';
import { CardsService } from 'src/cards/cards.service';
import { CardsSortingService } from 'src/cards/cards-sorting.service';

@Resolver('gameplay')
export class GameplayResolver {
  constructor(
    private readonly newGameService: NewGameService,
    private readonly cardsService: CardsService,
    private readonly cardsSortingService: CardsSortingService,
  ) {}

  @Mutation(() => CreateNewGameResponse)
  async createNewGame(
    @Args('newGameDto', { type: () => CreateNewGameInput })
    newGameDto: CreateNewGameInput,
  ) {
    await this.newGameService.validatePlayersExist(newGameDto.playerRefs);
    await this.newGameService.validateUniqueGame(newGameDto.playerRefs);
    const cards = await this.cardsService.findAll();
    const cardRefsByAge = this.cardsSortingService.refsByAge({ cards });
    const { deck, achievements, playerStarterHands } =
      this.newGameService.getGameSetup(cardRefsByAge, newGameDto.playerRefs);
    return this.newGameService.startGame({
      playerRefs: newGameDto.playerRefs,
      starterDeck: deck,
      ageAchievements: achievements,
      playerStarterHands,
    });
  }
}
