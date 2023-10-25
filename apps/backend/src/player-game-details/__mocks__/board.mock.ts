import { Board } from '../schemas/board.schema';

import {
  MOCK_EMPTY_BOARD_PILE,
  MOCK_SPLAYED_BOARD_PILE,
  MOCK_UNSPLAYED_BOARD_PILE,
} from './board-pile.mock';

export const MOCK_EMPTY_BOARD: Board = {
  blue: Object.assign({}, MOCK_EMPTY_BOARD_PILE),
  green: Object.assign({}, MOCK_EMPTY_BOARD_PILE),
  purple: Object.assign({}, MOCK_EMPTY_BOARD_PILE),
  red: Object.assign({}, MOCK_EMPTY_BOARD_PILE),
  yellow: Object.assign({}, MOCK_EMPTY_BOARD_PILE),
};

export const MOCK_BOARD: Board = Object.assign(
  {},
  {
    ...MOCK_EMPTY_BOARD,
    green: Object.assign({}, MOCK_UNSPLAYED_BOARD_PILE),
    red: Object.assign({}, MOCK_SPLAYED_BOARD_PILE),
  }
);
