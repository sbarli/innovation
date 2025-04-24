import { Injectable } from '@nestjs/common';

import { getCatchErrorMessage } from '@inno/utils';

import { CardsService } from 'src/cards/services/cards.service';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { Board } from 'src/player-game-details/schemas/board.schema';

import { addCardToExistingBoard } from '../helpers/board';

export interface IMeldCardfromHandResponse {
  updatedPlayerHand: string[];
  updatedPlayerBoard: Board;
}

@Injectable()
export class PlayerActionsService {
  constructor(
    private cardsService: CardsService,
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
      const updatedDetails = {
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
          hand: updatedDetails.updatedPlayerHand,
          board: updatedDetails.updatedPlayerBoard,
        },
      });
      if (!updatedPlayerGameDetails) {
        throw new Error('Failed to update player game details');
      }
      return updatedDetails;
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
