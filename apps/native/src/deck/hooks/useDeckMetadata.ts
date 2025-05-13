import { useMemo } from 'react';

import { Age } from '@inno/constants';
import { Deck } from '@inno/gql';

import { IDeckPileMetadata } from '../components/DeckLayout';

interface IUseDeckMetadataProps {
  deck: Deck;
}

export const useDeckMetadata = ({ deck }: IUseDeckMetadataProps) => {
  const deckMetadata = useMemo(() => {
    return Object.keys(deck).reduce((acc, key) => {
      const maybeAge = key as Age;
      if (Age[maybeAge]) {
        acc.push({
          age: maybeAge,
          numCardsInPile: deck[key as keyof Deck]?.length ?? 0,
        });
      }
      return acc;
    }, [] as IDeckPileMetadata[]);
  }, [deck]);
  return {
    deckMetadata,
  };
};
