import { SplayOption } from '../player-game-details.types';
import { BoardPile } from '../schemas/board-pile.schema';

export const MOCK_CARD_REF_1 = 'mock-card-ref-1';
export const MOCK_CARD_REF_2 = 'mock-card-ref-2';

export const MOCK_EMPTY_BOARD_PILE: BoardPile = {
  cardRefs: [],
  splayed: undefined,
};

export const MOCK_UNSPLAYED_BOARD_PILE: BoardPile = {
  cardRefs: [MOCK_CARD_REF_1],
  splayed: undefined,
};

export const MOCK_SPLAYED_BOARD_PILE: BoardPile = {
  cardRefs: [MOCK_CARD_REF_1, MOCK_CARD_REF_2],
  splayed: SplayOption.LEFT,
};
