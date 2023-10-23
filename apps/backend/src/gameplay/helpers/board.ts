import { Board } from 'src/player-game-details/schemas/board.schema';

export const createBaseBoard = (): Board => ({
  blue: {
    cardRefs: [],
  },
  green: {
    cardRefs: [],
  },
  purple: {
    cardRefs: [],
  },
  red: {
    cardRefs: [],
  },
  yellow: {
    cardRefs: [],
  },
});
