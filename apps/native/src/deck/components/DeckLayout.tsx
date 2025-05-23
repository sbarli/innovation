import { FlatList, ListRenderItemInfo } from 'react-native';

import { Age, AgeDataByAgeStr } from '@inno/constants';

import { BadgeType, CountBadge } from '../../app-core/components/CountBadge';
import { MaybePressable } from '../../app-core/components/MaybePressable';
import { Box } from '../../app-core/components/gluestack/box';
import { VerticalEmptyCardSlot } from '../../cards/components/VerticalEmptyCardSlot';
import { CardBack } from '../../cards/components/back/CardBack';

export interface IDeckPileMetadata {
  age: Age;
  numCardsInPile: number;
  availableToDraw: boolean;
  onDraw?(): void;
}

export interface IDeckLayoutProps {
  deckMetadata: IDeckPileMetadata[];
}

export const DeckLayout = ({ deckMetadata }: IDeckLayoutProps) => {
  // NOTE: using native FlatList vs. Gluestack due to missing types: https://github.com/gluestack/gluestack-ui/issues/1041
  // TODO: upgrade gluestack dep to hopefully resolve issue
  return (
    <FlatList
      data={deckMetadata}
      renderItem={({ item: pile }: ListRenderItemInfo<IDeckPileMetadata>) => {
        const ageNum = AgeDataByAgeStr[pile.age].num;
        return pile.numCardsInPile ? (
          <MaybePressable
            handlePress={pile.availableToDraw && pile.onDraw ? pile.onDraw : undefined}
          >
            <Box>
              <Box>
                <CardBack age={ageNum} />
              </Box>
              <CountBadge
                badgeType={pile.numCardsInPile < 3 ? BadgeType.WARNING : BadgeType.DEFAULT}
                count={pile.numCardsInPile}
              />
            </Box>
          </MaybePressable>
        ) : (
          <VerticalEmptyCardSlot />
        );
      }}
      keyExtractor={(item) => item.age.toString()}
      horizontal={false}
      numColumns={5}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};
