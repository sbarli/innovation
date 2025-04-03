import { MOCK_EMPTY_PLAYER_AGE_ACHIEVEMENTS } from 'src/games/__mocks__/age-achievements.mock';

import {
  CreatePlayerGameDetailsInput,
  PlayerGameDetails,
} from '../schemas/player-game-details.schema';

import { MOCK_BOARD } from './board.mock';
import { MOCK_HAND } from './hand.mock';
import { MOCK_EMPTY_SCORE_CARD_REFS, MOCK_SCORE_CARD_REFS } from './score.mock';

export const MOCK_PLAYER_GAME_DETAILS_ID = 'mock-player-game-details-id';
export const MOCK_GAME_REF = 'mock-game-ref';
export const MOCK_PLAYER_REF = 'mock-player-ref';
export const MOCK_AGE = 1;

export const MOCK_PLAYER_GAME_DETAILS_INPUT: CreatePlayerGameDetailsInput = {
  gameRef: MOCK_GAME_REF,
  playerRef: MOCK_PLAYER_REF,
  board: MOCK_BOARD,
  ageAchievements: MOCK_EMPTY_PLAYER_AGE_ACHIEVEMENTS,
  hand: MOCK_HAND,
  scorePile: MOCK_EMPTY_SCORE_CARD_REFS,
  specialAchievements: [],
};

export const MOCK_PLAYER_GAME_DETAILS: PlayerGameDetails = {
  _id: MOCK_PLAYER_GAME_DETAILS_ID,
  createdAt: undefined,
  updatedAt: undefined,
  gameRef: MOCK_GAME_REF,
  playerRef: MOCK_PLAYER_REF,
  board: MOCK_BOARD,
  ageAchievements: MOCK_EMPTY_PLAYER_AGE_ACHIEVEMENTS,
  hand: MOCK_HAND,
  scorePile: MOCK_SCORE_CARD_REFS,
  specialAchievements: [],
};
