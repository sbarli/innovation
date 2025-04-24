import { Color } from '@inno/constants';

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

export const addCardToExistingBoard = ({
  cardColor,
  cardId,
  currentBoard,
}: {
  cardColor: string;
  cardId: string;
  currentBoard: Board;
}): Board => {
  const updatedBoard = createBaseBoard();

  Object.keys(updatedBoard).forEach((color) => {
    updatedBoard[color as Color] = {
      splayed: currentBoard[color as Color].splayed,
      cardRefs:
        color === cardColor
          ? [cardId, ...currentBoard[color as Color].cardRefs]
          : currentBoard[color as Color].cardRefs,
    };
  });

  return updatedBoard;
};
