import { Color, Resource } from '@inno/constants';

import { MOCK_CARD } from 'src/cards/__mocks__/cards.mock';
import { Card } from 'src/cards/schemas/card.schema';
import { MOCK_EMPTY_BOARD } from 'src/player-game-details/__mocks__/board.mock';
import { SplayOption } from 'src/player-game-details/player-game-details.types';

import {
  determineWinnerByHighestResource,
  determineWinnerByHighestScore,
  determineWinnerByLowestResource,
  determineWinnerByLowestScore,
} from '../helpers/winner.helpers';

const MOCK_CARDS: Card[] = [
  {
    ...MOCK_CARD,
    age: 1,
    _id: 'card-1.1',
    resourceTotals: {
      castles: 0,
      crowns: 1,
      leaves: 0,
      lightbulbs: 2,
      factories: 0,
      timepieces: 0,
    },
    resourceSpaces: {
      resourceSpace1: undefined,
      resourceSpace2: Resource.LIGHTBULBS,
      resourceSpace3: Resource.LIGHTBULBS,
      resourceSpace4: Resource.CROWNS,
    },
  },
  {
    ...MOCK_CARD,
    age: 1,
    _id: 'card-1.2',
    resourceTotals: {
      castles: 3,
      crowns: 0,
      leaves: 0,
      lightbulbs: 0,
      factories: 0,
      timepieces: 0,
    },
    resourceSpaces: {
      resourceSpace1: undefined,
      resourceSpace2: Resource.CASTLES,
      resourceSpace3: Resource.CASTLES,
      resourceSpace4: Resource.CASTLES,
    },
  },
  {
    ...MOCK_CARD,
    age: 2,
    _id: 'card-2.1',
    resourceTotals: {
      castles: 1,
      crowns: 1,
      leaves: 1,
      lightbulbs: 0,
      factories: 0,
      timepieces: 0,
    },
    resourceSpaces: {
      resourceSpace1: Resource.CASTLES,
      resourceSpace2: Resource.LEAVES,
      resourceSpace3: undefined,
      resourceSpace4: Resource.CROWNS,
    },
  },
  {
    ...MOCK_CARD,
    age: 2,
    _id: 'card-2.2',
    resourceTotals: {
      castles: 0,
      crowns: 0,
      leaves: 2,
      lightbulbs: 1,
      factories: 0,
      timepieces: 0,
    },
    resourceSpaces: {
      resourceSpace1: Resource.LEAVES,
      resourceSpace2: Resource.LEAVES,
      resourceSpace3: Resource.LIGHTBULBS,
      resourceSpace4: undefined,
    },
  },
  {
    ...MOCK_CARD,
    age: 5,
    _id: 'card-5.1',
    resourceTotals: {
      castles: 0,
      crowns: 0,
      leaves: 0,
      lightbulbs: 0,
      factories: 3,
      timepieces: 0,
    },
    resourceSpaces: {
      resourceSpace1: Resource.FACTORIES,
      resourceSpace2: Resource.FACTORIES,
      resourceSpace3: Resource.FACTORIES,
      resourceSpace4: undefined,
    },
  },
  {
    ...MOCK_CARD,
    age: 3,
    _id: 'card-3.1',
    resourceTotals: {
      castles: 0,
      crowns: 1,
      leaves: 0,
      lightbulbs: 2,
      factories: 0,
      timepieces: 0,
    },
    resourceSpaces: {
      resourceSpace1: undefined,
      resourceSpace2: Resource.LIGHTBULBS,
      resourceSpace3: Resource.CROWNS,
      resourceSpace4: Resource.LIGHTBULBS,
    },
  },
];
const PLAYER_ONE_SCORE_PILE = ['card-1.1'];
const PLAYER_TWO_SCORE_PILE = ['card-3.1', 'card-1.2', 'card-2.1'];
const PLAYER_THREE_SCORE_PILE = ['card-5.1'];
const SCORE_PILES_BY_PLAYER = {
  player1: PLAYER_ONE_SCORE_PILE,
  player2: PLAYER_TWO_SCORE_PILE,
  player3: PLAYER_THREE_SCORE_PILE,
};

const PLAYER_ONE_BOARD = {
  ...MOCK_EMPTY_BOARD,
  [Color.BLUE]: {
    ...MOCK_EMPTY_BOARD.blue,
    cardRefs: ['card-3.1'],
  },
  [Color.GREEN]: {
    ...MOCK_EMPTY_BOARD.green,
    cardRefs: ['card-5.1', 'card-2.1'],
  },
};

const PLAYER_TWO_BOARD = {
  ...MOCK_EMPTY_BOARD,
};

const PLAYER_THREE_BOARD = {
  ...MOCK_EMPTY_BOARD,
  [Color.GREEN]: {
    ...MOCK_EMPTY_BOARD.green,
    cardRefs: ['card-2.2', 'card-1.2'],
  },
};

const BOARDS_BY_PLAYER = {
  player1: PLAYER_ONE_BOARD,
  player2: PLAYER_TWO_BOARD,
  player3: PLAYER_THREE_BOARD,
};

describe('determineWinnerByHighestScore', () => {
  it('should return player with highest score', () => {
    const output = determineWinnerByHighestScore({
      cards: MOCK_CARDS,
      scorePilesByPlayer: SCORE_PILES_BY_PLAYER,
    });
    expect(output).toEqual('player2');
  });
});

describe('determineWinnerByLowestScore', () => {
  it('should return player with lowest score', () => {
    const output = determineWinnerByLowestScore({
      cards: MOCK_CARDS,
      scorePilesByPlayer: SCORE_PILES_BY_PLAYER,
    });
    expect(output).toEqual('player1');
  });
});

describe('determineWinnerByHighestResource', () => {
  it('should return player with most amount of specified resource visible on board', () => {
    const output = determineWinnerByHighestResource({
      boardsByPlayer: BOARDS_BY_PLAYER,
      cards: MOCK_CARDS,
      resource: Resource.CASTLES,
    });
    expect(output).toEqual('player1');
  });
  it('should handle splayed cards', () => {
    const customBoardsByPlayer = {
      ...BOARDS_BY_PLAYER,
      player3: {
        ...BOARDS_BY_PLAYER.player3,
        [Color.GREEN]: {
          ...BOARDS_BY_PLAYER.player3.green,
          splayed: SplayOption.UP,
        },
      },
    };
    const output = determineWinnerByHighestResource({
      boardsByPlayer: customBoardsByPlayer,
      cards: MOCK_CARDS,
      resource: Resource.CASTLES,
    });
    expect(output).toEqual('player3');
  });
});

describe('determineWinnerByLowestResource', () => {
  it('should return player with lowest amount of specified resource visible on board', () => {
    const output = determineWinnerByLowestResource({
      boardsByPlayer: BOARDS_BY_PLAYER,
      cards: MOCK_CARDS,
      resource: Resource.LIGHTBULBS,
    });
    expect(output).toEqual('player2');
  });
});
