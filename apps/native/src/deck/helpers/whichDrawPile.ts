import { Age } from '@inno/constants';
import { Deck } from '@inno/gql';

interface IWhichDrawPileProps {
  deck: Deck;
  currentPlayerAge: Age;
}

export const whichDrawPile = ({ deck, currentPlayerAge }: IWhichDrawPileProps) => {
  if (deck[currentPlayerAge].length) {
    return currentPlayerAge;
  }
  const deckAges = Object.keys(deck) as Age[];
  const ageIdx = deckAges.indexOf(currentPlayerAge);
  const remainingAges = deckAges.slice(ageIdx + 1);
  for (let i = 0; i <= remainingAges.length; i++) {
    if (deck[remainingAges[i]].length) {
      return remainingAges[i];
    }
  }
  return null;
};
