import { useCallback, useMemo } from 'react';

import { AgeString } from '@inno/constants';
import { Deck } from '@inno/gql';

import { IDeckPileMetadata } from '../components/DeckLayout';

interface IUseDeckMetadataProps {
  deck: Deck;
}

export const useDeckMetadata = ({ deck }: IUseDeckMetadataProps) => {
  const handleDraw = useCallback(({ age, player }: { age: AgeString; player: string }) => {
    console.log(`ready to draw ${age} age for ${player}`);
    // TODO: add actual draw logic here
  }, []);

  const deckMetadata = useMemo(() => {
    return Object.keys(deck).reduce((acc, key) => {
      const maybeAge = key as AgeString;
      if (AgeString[maybeAge]) {
        acc.push({
          age: maybeAge,
          numCardsInPile: deck[key as keyof Deck]?.length ?? 0,
          // TODO: pull actual current game data for this
          availableToDraw: maybeAge === AgeString.ONE,
          // TODO: pull actual current player data for this
          onDraw: () => handleDraw({ age: maybeAge, player: 'TESTING' }),
        });
      }
      return acc;
    }, [] as IDeckPileMetadata[]);
  }, [deck]);
  return {
    deckMetadata,
  };
};
