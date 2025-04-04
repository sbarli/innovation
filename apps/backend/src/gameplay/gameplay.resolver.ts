import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CardsSortingService } from 'src/cards/services/cards-sorting.service';
import { CardsService } from 'src/cards/services/cards.service';

import { CreateNewGameInput } from './dto/create-new-game.input.dto';
import { CreateNewGameResponse } from './dto/create-new-game.output.dto';
import { MeldInput } from './dto/meld.input.dto';
import { MeldResponse } from './dto/meld.output.dto';
import { NewGameService } from './services/new-game.service';
import { PlayerActionsService } from './services/player-actions.service';
import { VaildationService } from './services/validation.service';

@Resolver('gameplay')
export class GameplayResolver {
  constructor(
    private readonly validationService: VaildationService,
    private readonly newGameService: NewGameService,
    private readonly cardsService: CardsService,
    private readonly cardsSortingService: CardsSortingService,
    private readonly playerActionsService: PlayerActionsService
  ) {}

  @Mutation(() => CreateNewGameResponse)
  async newGame(
    @Args('newGameDto', { type: () => CreateNewGameInput })
    newGameDto: CreateNewGameInput
  ) {
    await this.validationService.validateRoomExists(newGameDto.roomRef);
    await this.validationService.validatePlayersExist(newGameDto.playerRefs);
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

  @Mutation(() => MeldResponse)
  async meld(
    @Args('meldInput', { type: () => MeldInput })
    meldInput: MeldInput
  ) {
    console.log('Meld input:', meldInput);
    if (meldInput.meldType === 'fromHand') {
      console.log('Melding from hand');
      const data = await this.playerActionsService.meldCardFromHand({
        cardId: meldInput.cardRef,
        gameId: meldInput.gameRef,
        playerId: meldInput.playerRef,
      });
      return {
        gameId: meldInput.gameRef,
        playerId: meldInput.playerRef,
        updatedPlayerBoard: data.updatedPlayerBoard,
        metadata: {
          updatedPlayerHand: data.updatedPlayerHand,
        },
      };
    }
  }
}
