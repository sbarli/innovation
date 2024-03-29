import { MOCK_RESOURCE_TOTALS } from 'src/cards/__mocks__/resource-totals.mock';
import { MOCK_EMPTY_PLAYER_ACHIEVEMENTS } from 'src/games/__mocks__/achievements.mock';

import {
  CreatePlayerGameDetailsInput,
  PlayerGameDetails,
} from '../schemas/player-game-details.schema';

import { MOCK_BOARD } from './board.mock';
import { MOCK_HAND } from './hand.mock';
import {
  MOCK_EMPTY_SCORE_CARD_REFS,
  MOCK_SCORE,
  MOCK_SCORE_CARD_REFS,
  MOCK_START_SCORE,
} from './score.mock';

export const MOCK_PLAYER_GAME_DETAILS_ID = 'mock-player-game-details-id';
export const MOCK_GAME_REF = 'mock-game-ref';
export const MOCK_PLAYER_REF = 'mock-player-ref';
export const MOCK_AGE = 1;

export const MOCK_PLAYER_GAME_DETAILS_INPUT: CreatePlayerGameDetailsInput = {
  gameRef: MOCK_GAME_REF,
  playerRef: MOCK_PLAYER_REF,
  age: MOCK_AGE,
  score: MOCK_START_SCORE,
  resourceTotals: MOCK_RESOURCE_TOTALS,
  board: MOCK_BOARD,
  achievements: MOCK_EMPTY_PLAYER_ACHIEVEMENTS,
  hand: MOCK_HAND,
  scoreCardRefs: MOCK_EMPTY_SCORE_CARD_REFS,
};

export const MOCK_PLAYER_GAME_DETAILS: PlayerGameDetails = {
  _id: MOCK_PLAYER_GAME_DETAILS_ID,
  createdAt: undefined,
  updatedAt: undefined,
  gameRef: MOCK_GAME_REF,
  playerRef: MOCK_PLAYER_REF,
  age: MOCK_AGE,
  score: MOCK_SCORE,
  resourceTotals: MOCK_RESOURCE_TOTALS,
  board: MOCK_BOARD,
  achievements: MOCK_EMPTY_PLAYER_ACHIEVEMENTS,
  hand: MOCK_HAND,
  scoreCardRefs: MOCK_SCORE_CARD_REFS,
};
