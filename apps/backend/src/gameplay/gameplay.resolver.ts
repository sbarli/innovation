import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CardsSortingService } from 'src/cards/services/cards-sorting.service';
import { CardsService } from 'src/cards/services/cards.service';

import { CreateNewGameInput } from './dto/create-new-game.input.dto';
import { CreateNewGameResponse } from './dto/create-new-game.output.dto';
import { DrawInput } from './dto/draw.input.dto';
import { DrawResponse } from './dto/draw.output.dto';
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
    let gameStageUpdated = false;
    let currentActionUpdated = false;
    if (meldInput.meldType === 'fromHand') {
      const data = await this.playerActionsService.meldCardFromHand({
        cardId: meldInput.cardRef,
        gameId: meldInput.gameRef,
        playerId: meldInput.playerRef,
      });
      if (meldInput.isStarterMeld) {
        const movedToActive = await this.playerActionsService.maybeMoveGameStage({
          gameId: meldInput.gameRef,
        });
        gameStageUpdated = movedToActive;
      } else if (meldInput.countAsAction) {
        const updatedToNextAction = await this.playerActionsService.moveToNextGameAction({
          gameId: meldInput.gameRef,
        });
        currentActionUpdated = updatedToNextAction;
      }
      return {
        gameId: meldInput.gameRef,
        playerId: meldInput.playerRef,
        updatedPlayerBoard: data.updatedPlayerBoard,
        metadata: {
          updatedPlayerHand: data.updatedPlayerHand,
          gameStageUpdated,
          currentActionUpdated,
        },
      };
    }
  }

  @Mutation(() => DrawResponse)
  async draw(
    @Args('drawInput', { type: () => DrawInput })
    drawInput: DrawInput
  ) {
    let gameStageUpdated = false;
    let currentActionUpdated = false;
    const drawData = await this.playerActionsService.drawCard({
      gameRef: drawInput.gameRef,
      playerRef: drawInput.playerRef,
      specificAgeToDraw:
        drawInput.drawType === 'specificAge' && drawInput.ageToDraw ? drawInput.ageToDraw : null,
    });
    if (!drawData) {
      throw new Error('gameplayResolver.draw: ERROR: failed to draw');
    }
    if (drawData.isGameOver) {
      const winnerSet = await this.playerActionsService.maybeMoveGameStage({
        gameId: drawInput.gameRef,
        winnerMetadata: { expectedWinnerType: 'highestScore' },
      });
      if (!winnerSet) {
        throw new Error('gameplayResolver.draw: ERROR: failed to set winner');
      }
      gameStageUpdated = true;
    } else if (drawInput.countAsAction) {
      const updatedToNextAction = await this.playerActionsService.moveToNextGameAction({
        gameId: drawInput.gameRef,
      });
      currentActionUpdated = updatedToNextAction;
    }
    return {
      ageDrawn: drawData.ageDrawn,
      gameId: drawInput.gameRef,
      playerId: drawInput.playerRef,
      metadata: {
        updatedPlayerHand: drawData.updatedPlayerHand,
        updatedDeck: drawData.updatedDeck,
        gameStageUpdated,
        currentActionUpdated,
      },
    };
  }
}
