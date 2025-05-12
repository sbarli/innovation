import { Age, AgeDataByAgeStr, Nullable } from '@inno/constants';

import { Deck } from 'src/games/schemas/deck.schema';

export interface IDetermineDrawPileProps {
  deck: Deck;
  desiredDrawAge: Age;
}
export const determineDrawPile = ({
  deck,
  desiredDrawAge,
}: IDetermineDrawPileProps): Nullable<Age> => {
  if (deck[desiredDrawAge].length) {
    return desiredDrawAge;
  }
  let nextAgeToCheck = AgeDataByAgeStr[desiredDrawAge].nextAge;
  while (nextAgeToCheck) {
    if (deck[nextAgeToCheck].length) {
      return nextAgeToCheck;
    }
    nextAgeToCheck = AgeDataByAgeStr[nextAgeToCheck].nextAge;
  }
  return null;
};
