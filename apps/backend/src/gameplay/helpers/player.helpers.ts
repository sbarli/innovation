import { Age, AgeDataByAgeNum, AgeDataByAgeStr, AgeNum, IAgeDataItem } from '@inno/constants';

import { Card } from 'src/cards/schemas/card.schema';
import { Board } from 'src/player-game-details/schemas/board.schema';

export interface IDeterminePlayerAgeProps {
  cards: Card[];
  playerBoard: Board;
}

export const determinePlayerAge = ({ cards, playerBoard }: IDeterminePlayerAgeProps): Age => {
  const DEFAULT_AGE: IAgeDataItem = AgeDataByAgeStr[Age.ONE];
  const playerAge: IAgeDataItem = Object.keys(playerBoard).reduce((curHighest, color) => {
    const maybeCardId = playerBoard[color as keyof Board]?.cardRefs?.[0];
    const card = maybeCardId ? cards.find((c) => c._id === maybeCardId) : undefined;
    if (card && card.age > curHighest.num) {
      return AgeDataByAgeNum[card.age as AgeNum];
    }
    return curHighest;
  }, DEFAULT_AGE);
  return playerAge.str;
};
