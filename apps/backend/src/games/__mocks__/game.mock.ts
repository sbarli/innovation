import { GameStage } from '@inno/constants';

import { MOCK_ROOM_ID } from 'src/rooms/__mocks__/room.mock';
import { MOCK_USER_ID, MOCK_USER_ID_2 } from 'src/users/__mocks__/user.mock';

import { CreateGameInput, Game } from '../schemas/game.schema';

import { MOCK_DECK } from './deck.mock';

export const MOCK_ID = 'mock_id';

export const MOCK_GAME_INPUT: CreateGameInput = {
  roomRef: MOCK_ROOM_ID,
  currentActionNumber: 2,
  currentPlayerRef: MOCK_USER_ID,
  stage: GameStage.SETUP,
  playerRefs: [MOCK_USER_ID, MOCK_USER_ID_2],
  deck: MOCK_DECK,
  ageAchievements: {
    ONE: '6435a7d5dd31b5790f7bc58a',
    TWO: '6435a7d5dd31b5790f7bc59b',
    THREE: '6435a7d5dd31b5790f7bc5a4',
    FOUR: '6435a7d5dd31b5790f7bc5ad',
    FIVE: '6435a7d5dd31b5790f7bc5bb',
    SIX: '6435a7d5dd31b5790f7bc5bf',
    SEVEN: '6435a7d5dd31b5790f7bc5ce',
    EIGHT: '6435a7d5dd31b5790f7bc5d3',
    NINE: '6435a7d5dd31b5790f7bc5e4',
  },
};

export const MOCK_GAME: Game = {
  _id: MOCK_ID,
  roomRef: MOCK_ROOM_ID,
  createdAt: undefined,
  updatedAt: undefined,
  currentActionNumber: 2,
  currentPlayerRef: MOCK_USER_ID,
  stage: GameStage.ACTIVE,
  playerRefs: [MOCK_USER_ID, MOCK_USER_ID_2],
  deck: MOCK_DECK,
  ageAchievements: {
    ONE: '6435a7d5dd31b5790f7bc58a',
    TWO: '6435a7d5dd31b5790f7bc59b',
    THREE: '6435a7d5dd31b5790f7bc5a4',
    FOUR: '6435a7d5dd31b5790f7bc5ad',
    FIVE: '6435a7d5dd31b5790f7bc5bb',
    SIX: '6435a7d5dd31b5790f7bc5bf',
    SEVEN: '6435a7d5dd31b5790f7bc5ce',
    EIGHT: '6435a7d5dd31b5790f7bc5d3',
    NINE: '6435a7d5dd31b5790f7bc5e4',
  },
  winnerRef: undefined,
};

export const MOCK_GAME_WITH_WINNER: Game = {
  ...MOCK_GAME,
  winnerRef: MOCK_USER_ID_2,
};
