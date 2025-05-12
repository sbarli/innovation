import { Injectable } from '@nestjs/common';

import { Age, GameStage, Nullable, Resource, WinnerType } from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

import { CardsService } from 'src/cards/services/cards.service';
import { UpdateGameInput } from 'src/games/dto/update-game.dto';
import { GamesService } from 'src/games/games.service';
import { Deck } from 'src/games/schemas/deck.schema';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { Board } from 'src/player-game-details/schemas/board.schema';

import { addCardToExistingBoard } from '../helpers/board';
import { determineDrawPile } from '../helpers/deck.helpers';
import { determinePlayerAge } from '../helpers/player.helpers';
import { checkSetupStageComplete } from '../helpers/stage-helpers';
import {
  determineWinnerByHighestResource,
  determineWinnerByHighestScore,
  determineWinnerByLowestResource,
  determineWinnerByLowestScore,
} from '../helpers/winner.helpers';

export interface IMeldCardfromHandResponse {
  updatedPlayerHand: string[];
  updatedPlayerBoard: Board;
}

export interface IDrawCardResponse {
  ageDrawn: Nullable<Age>;
  isGameOver: boolean;
  updatedDeck: Nullable<Deck>;
  updatedPlayerHand: Nullable<string[]>;
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

  async drawCard({
    gameRef,
    playerRef,
    specificAgeToDraw,
  }: {
    gameRef: string;
    playerRef: string;
    specificAgeToDraw: Nullable<Age>;
  }): Promise<IDrawCardResponse> {
    try {
      const response: IDrawCardResponse = {
        ageDrawn: null,
        isGameOver: false,
        updatedDeck: null,
        updatedPlayerHand: null,
      };
      const [cards, gameData, playerGameData] = await Promise.all([
        this.cardsService.findAll(),
        this.gamesService.findGameById(gameRef),
        this.playerGameDetailsService.findDetailsByGameAndPlayer({ gameRef, playerRef }),
      ]);
      if (!cards?.length) {
        throw new Error('unable to get cards');
      }
      if (!gameData) {
        throw new Error('unable to get game data');
      }
      if (!playerGameData) {
        throw new Error('unable to get player data');
      }
      const desiredDrawAge =
        specificAgeToDraw || determinePlayerAge({ cards, playerBoard: playerGameData.board });
      if (!desiredDrawAge) {
        throw new Error('unable to determine desired age to draw');
      }
      const ageToDraw = determineDrawPile({ deck: gameData.deck, desiredDrawAge });
      if (!ageToDraw) {
        // no age to draw means game over
        response.isGameOver = true;
        return response;
      }
      const drawnCardId = gameData.deck[ageToDraw][0];
      const updatedDeckPile = gameData.deck[ageToDraw].slice(1);
      const updatedPlayerHand = [...playerGameData.hand, drawnCardId];
      const updatedGame = await this.gamesService.updateGameByRef({
        ref: gameRef,
        gameUpdates: {
          deck: {
            ...gameData.deck,
            [ageToDraw]: updatedDeckPile,
          },
        },
      });
      if (!updatedGame) {
        throw new Error('failed to remove card from deck');
      }
      const updatedPlayerData = await this.playerGameDetailsService.updateById({
        id: playerGameData._id,
        updates: {
          hand: updatedPlayerHand,
        },
      });
      if (!updatedPlayerData) {
        throw new Error('failed to add card to hand');
      }
      response.ageDrawn = ageToDraw;
      response.updatedDeck = updatedGame.deck;
      response.updatedPlayerHand = updatedPlayerData.hand;
      return response;
    } catch (error: unknown) {
      throw new Error(
        `playerActionsService.drawCard: ${getCatchErrorMessage(
          error,
          'Issue drawing card by player'
        )}`
      );
    }
  }

  async maybeMoveGameStage({
    gameId,
    winnerMetadata,
  }: {
    gameId: string;
    winnerMetadata?: { expectedWinnerType: WinnerType; resource?: Resource };
  }): Promise<boolean> {
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
        case GameStage.ACTIVE: {
          if (!winnerMetadata) {
            return false;
          }
          const cards = await this.cardsService.findAll();
          if (!cards) {
            throw new Error('cannot determine winner without cards');
          }
          switch (winnerMetadata.expectedWinnerType) {
            case 'highestScore': {
              const scorePilesByPlayer = playerGameDetails.reduce(
                (acc, cur) => {
                  acc[cur._id] = cur.scorePile;
                  return acc;
                },
                {} as Record<string, string[]>
              );
              const winnerRef = determineWinnerByHighestScore({ cards, scorePilesByPlayer });
              if (!winnerRef) {
                throw new Error('expected winner with highest score, received no player');
              }
              const winnerSet = await this.gamesService.updateGameByRef({
                ref: gameId,
                gameUpdates: { winnerRef, stage: GameStage.COMPLETE },
              });
              if (!winnerSet) {
                throw new Error('error setting winner with highest score');
              }
              return true;
            }
            case 'lowestScore': {
              const scorePilesByPlayer = playerGameDetails.reduce(
                (acc, cur) => {
                  acc[cur._id] = cur.scorePile;
                  return acc;
                },
                {} as Record<string, string[]>
              );
              const winnerRef = determineWinnerByLowestScore({ cards, scorePilesByPlayer });
              if (!winnerRef) {
                throw new Error('expected winner with lowest score, received no player');
              }
              const winnerSet = await this.gamesService.updateGameByRef({
                ref: gameId,
                gameUpdates: { winnerRef, stage: GameStage.COMPLETE },
              });
              if (!winnerSet) {
                throw new Error('error setting winner with lowest score');
              }
              return true;
            }
            case 'highestResource': {
              if (!winnerMetadata.resource) {
                throw new Error('missing expected resource for WinnerTpe highestResource');
              }
              const boardsByPlayer = playerGameDetails.reduce(
                (acc, cur) => {
                  acc[cur._id] = cur.board;
                  return acc;
                },
                {} as Record<string, Board>
              );
              const winnerRef = determineWinnerByHighestResource({
                cards,
                resource: winnerMetadata.resource,
                boardsByPlayer,
              });
              if (!winnerRef) {
                throw new Error('expected winner with highest resource count, received no player');
              }
              const winnerSet = await this.gamesService.updateGameByRef({
                ref: gameId,
                gameUpdates: { winnerRef, stage: GameStage.COMPLETE },
              });
              if (!winnerSet) {
                throw new Error('error setting winner with highest resource count');
              }
              return true;
            }
            case 'lowestResource': {
              if (!winnerMetadata.resource) {
                throw new Error('missing expected resource for WinnerTpe lowestResource');
              }
              const boardsByPlayer = playerGameDetails.reduce(
                (acc, cur) => {
                  acc[cur._id] = cur.board;
                  return acc;
                },
                {} as Record<string, Board>
              );
              const winnerRef = determineWinnerByLowestResource({
                cards,
                resource: winnerMetadata.resource,
                boardsByPlayer,
              });
              if (!winnerRef) {
                throw new Error('expected winner with lowest resource count, received no player');
              }
              const winnerSet = await this.gamesService.updateGameByRef({
                ref: gameId,
                gameUpdates: { winnerRef, stage: GameStage.COMPLETE },
              });
              if (!winnerSet) {
                throw new Error('error setting winner with lowest resource count');
              }
              return true;
            }
            default:
              return false;
          }
        }
        case GameStage.COMPLETE:
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

  async moveToNextGameAction({ gameId }: { gameId: string }): Promise<boolean> {
    try {
      const game = await this.gamesService.findGameById(gameId);
      if (!game) {
        throw new Error('Game not found');
      }
      const gameUpdates = {} as UpdateGameInput;
      if (game.currentActionNumber === 2) {
        gameUpdates.currentActionNumber = 1;
        const playerRefs = game.playerRefs.map((r) => r.toString());
        const currentPlayerIdx = playerRefs.indexOf(game.currentPlayerRef.toString());
        const nextPlayerIdx = playerRefs.length - 1 === currentPlayerIdx ? 0 : currentPlayerIdx + 1;
        gameUpdates.currentPlayerRef = playerRefs[nextPlayerIdx];
      } else {
        gameUpdates.currentActionNumber = 2;
      }
      const updatedGame = await this.gamesService.updateGameByRef({
        ref: gameId,
        gameUpdates,
      });
      if (!updatedGame) {
        throw new Error('Error updating game to next action');
      }
      return true;
    } catch (error) {
      throw new Error(
        `playerActionsService.moveToNextGameAction: ${getCatchErrorMessage(
          error,
          'Unknown issue updating game to next action'
        )}`
      );
    }
  }
}
