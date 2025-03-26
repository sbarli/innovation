import { ages, AgeString } from '@inno/constants';
import { Deck } from '@inno/gql';

interface IWhichDrawPileProps {
  deck: Deck;
  currentPlayerAge: AgeString;
}

export const whichDrawPile = ({ deck, currentPlayerAge }: IWhichDrawPileProps) => {
  if (deck[currentPlayerAge].length) {
    return currentPlayerAge;
  }
  const ageIdx = ages.indexOf(currentPlayerAge);
  const remainingAges = ages.slice(ageIdx + 1);
  for (let i = 0; i <= remainingAges.length; i++) {
    if (deck[remainingAges[i]].length) {
      return remainingAges[i];
    }
  }
};
