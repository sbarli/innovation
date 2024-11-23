import { Box } from '@gluestack-ui/themed';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { AgeString, ageStringToAgeNumberMap, ages } from '@inno/constants';
import { Deck } from '@inno/gql';

import { BadgeType, CountBadge } from '../app-core/components/CountBadge';
import { VerticalEmptyCardSlot } from '../cards/components/VerticalEmptyCardSlot';
import { CardBack } from '../cards/components/back/CardBack';

export interface IDeckLayoutProps {
  deck: Deck;
}

export const DeckLayout = ({ deck }: IDeckLayoutProps) => {
  // NOTE: using native FlatList vs. Gluestack due to missing types: https://github.com/gluestack/gluestack-ui/issues/1041
  // TODO: upgrade gluestack dep to hopefully resolve issue
  return (
    <FlatList
      data={ages}
      renderItem={({ item: ageStr }: ListRenderItemInfo<AgeString>) => {
        const age = ageStringToAgeNumberMap[ageStr];
        const numCardsInPile = deck[ageStr].length;
        return !!numCardsInPile ? (
          <Box>
            <Box>
              <CardBack age={age} />
            </Box>
            <CountBadge
              badgeType={numCardsInPile < 3 ? BadgeType.WARNING : BadgeType.DEFAULT}
              count={numCardsInPile}
            />
          </Box>
        ) : (
          <VerticalEmptyCardSlot />
        );
      }}
      keyExtractor={(item) => item.toString()}
      horizontal={false}
      numColumns={5}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};
