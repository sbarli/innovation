import { Deck as GQLDeck } from '@inno/gql';

import { Deck } from '../../app-core/types/game.types';

export const formatDeckMetadata = (rawDeckData: GQLDeck): Deck => {
  const formattedDeck = { ...rawDeckData };
  delete formattedDeck.__typename;
  return formattedDeck;
};
