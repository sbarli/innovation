import { MOCK_PLAYER_REF_1, MOCK_PLAYER_REF_2 } from 'src/players/__mocks__/player.mock';

import { Game } from '../schemas/game.schema';

import { MOCK_DECK } from './deck.mock';

export const MOCK_ID = 'mock_id';

export const MOCK_GAME_INPUT: Game = {
  currentActionNumber: 2,
  currentPlayerRef: MOCK_PLAYER_REF_1,
  playerRefs: [MOCK_PLAYER_REF_1, MOCK_PLAYER_REF_2],
  deck: MOCK_DECK,
  achievements: {
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
  currentActionNumber: 2,
  currentPlayerRef: MOCK_PLAYER_REF_1,
  playerRefs: [MOCK_PLAYER_REF_1, MOCK_PLAYER_REF_2],
  deck: MOCK_DECK,
  achievements: {
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

export const MOCK_GAME_WITH_WINNER = {
  ...MOCK_GAME,
  winnerRef: MOCK_PLAYER_REF_2,
};
