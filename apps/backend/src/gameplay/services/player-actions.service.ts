import { Injectable } from '@nestjs/common';

import { GameStage } from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

import { CardsService } from 'src/cards/services/cards.service';
import { GamesService } from 'src/games/games.service';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { Board } from 'src/player-game-details/schemas/board.schema';

import { addCardToExistingBoard } from '../helpers/board';
import { checkSetupStageComplete } from '../helpers/stage-helpers';

export interface IMeldCardfromHandResponse {
  updatedPlayerHand: string[];
  updatedPlayerBoard: Board;
}

@Injectable()
export class PlayerActionsService {
  constructor(
    private cardsService: CardsService,
    private gamesService: GamesService,
    private playerGameDetailsService: PlayerGameDetailsService
  ) {}

  async meldCardFromHand({
    cardId,
    gameId,
    playerId,
  }: {
    cardId: string;
    gameId: string;
    playerId: string;
  }): Promise<IMeldCardfromHandResponse> {
    try {
      const card = await this.cardsService.findOneByRef(cardId);
      if (!card) {
        throw new Error('Card not found');
      }
      const playerGameDetails = await this.playerGameDetailsService.findDetailsByGameAndPlayer({
        gameRef: gameId,
        playerRef: playerId,
      });
      if (!playerGameDetails) {
        throw new Error('Player game details not found');
      }
      const cardInHand = playerGameDetails.hand.find((cid) => cid.toString() === cardId);
      if (!cardInHand) {
        throw new Error('Card not found in player hand');
      }
      const updates = {
        updatedPlayerHand: [...playerGameDetails.hand.filter((cid) => cid.toString() !== cardId)],

        updatedPlayerBoard: addCardToExistingBoard({
          cardColor: card.color,
          cardId,
          currentBoard: playerGameDetails.board,
        }),
      };
      const updatedPlayerGameDetails = await this.playerGameDetailsService.updateById({
        id: playerGameDetails._id,
        updates: {
          hand: updates.updatedPlayerHand,
          board: updates.updatedPlayerBoard,
        },
      });
      if (!updatedPlayerGameDetails) {
        throw new Error('Failed to update player game details');
      }
      return {
        updatedPlayerBoard: updatedPlayerGameDetails.board,
        updatedPlayerHand: updatedPlayerGameDetails.hand,
      };
    } catch (error) {
      throw new Error(
        `playerActionsService.meldCardFromHand: ${getCatchErrorMessage(
          error,
          'Issue melding card from hand'
        )}`
      );
    }
  }

  async maybeMoveGameStage({ gameId }: { gameId: string }): Promise<boolean> {
    try {
      const game = await this.gamesService.findGameById(gameId);
      if (!game) {
        throw new Error('Game not found');
      }
      const playerGameDetails = await this.playerGameDetailsService.findDetailsByGame({
        gameRef: gameId,
      });
      if (!playerGameDetails) {
        throw new Error('Player game details not found');
      }
      const { playerBoards, playerHands } = playerGameDetails.reduce(
        (acc, curDetails) => {
          acc.playerBoards.push(curDetails.board);
          acc.playerHands.push(curDetails.hand);
          return acc;
        },
        { playerBoards: [], playerHands: [] } as { playerBoards: Board[]; playerHands: string[][] }
      );
      switch (game.stage) {
        case GameStage.SETUP:
          if (
            checkSetupStageComplete({
              numPlayers: game.playerRefs.length,
              boards: playerBoards,
              hands: playerHands,
            })
          ) {
            const updatedGame = await this.gamesService.updateGameByRef({
              ref: gameId,
              gameUpdates: {
                stage: GameStage.ACTIVE,
              },
            });
            if (!updatedGame) {
              return false;
            }
            return true;
          }
          return false;
        default:
          throw new Error('Missing game stage');
      }
    } catch (error) {
      throw new Error(
        `playerActionsService.meldCardFromHand: ${getCatchErrorMessage(
          error,
          'Issue melding card from hand'
        )}`
      );
    }
  }
}
