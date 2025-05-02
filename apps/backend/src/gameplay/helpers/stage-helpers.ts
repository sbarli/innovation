import { Color } from '@inno/constants';

import { Board } from 'src/player-game-details/schemas/board.schema';

export const checkSetupStageComplete = ({
  numPlayers,
  boards,
  hands,
}: {
  numPlayers: number;
  boards: Board[];
  hands: string[][];
}) => {
  const numBoardsWithOneCard = boards.reduce((acc, playerBoard) => {
    let numCardsOnBoard = 0;
    Object.keys(playerBoard).forEach((pileColor) => {
      numCardsOnBoard += playerBoard[pileColor as Color].cardRefs.length;
    });
    if (numCardsOnBoard === 1) {
      return acc + 1;
    }
    return acc;
  }, 0);
  if (numBoardsWithOneCard !== numPlayers) {
    return false;
  }

  const numHandsWithOneCard = hands.reduce((acc, playerHand) => {
    if (playerHand.length === 1) {
      return acc + 1;
    }
    return acc;
  }, 0);
  if (numHandsWithOneCard !== numPlayers) {
    return false;
  }
  return true;
};
