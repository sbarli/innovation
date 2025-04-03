import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CardsSortingService } from 'src/cards/services/cards-sorting.service';
import { CardsService } from 'src/cards/services/cards.service';

import { CreateNewGameInput } from './dto/create-new-game.input.dto';
import { CreateNewGameResponse } from './dto/create-new-game.output.dto';
import { NewGameService } from './services/new-game.service';

@Resolver('gameplay')
export class GameplayResolver {
  constructor(
    private readonly newGameService: NewGameService,
    private readonly cardsService: CardsService,
    private readonly cardsSortingService: CardsSortingService
  ) {}

  @Mutation(() => CreateNewGameResponse)
  async newGame(
    @Args('newGameDto', { type: () => CreateNewGameInput })
    newGameDto: CreateNewGameInput
  ) {
    await this.newGameService.validateRoomExists(newGameDto.roomRef);
    await this.newGameService.validatePlayersExist(newGameDto.playerRefs);
    const cards = await this.cardsService.findAll();
    const cardRefsByAge = this.cardsSortingService.refsByAge({ cards });
    const { deck, ageAchievements, playerStarterHands } = this.newGameService.getGameSetup(
      cardRefsByAge,
      newGameDto.playerRefs
    );
    return this.newGameService.newGame({
      roomRef: newGameDto.roomRef,
      playerRefs: newGameDto.playerRefs,
      starterDeck: deck,
      ageAchievements,
      playerStarterHands,
    });
  }
}
