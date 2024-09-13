import { Box, HStack, VStack } from '@gluestack-ui/themed';

import { Color, Resource } from '@inno/constants';
import { Card as CardType } from '@inno/gql';

import { primaryCardColorMap } from '../../../app-core/constants/colors';

import { CardAge } from './CardAge';
import { CardName } from './CardName';
import { DogmaEffect } from './DogmaEffect';
import { ResourceSpace } from './ResourceSpace';

export interface ICardDetailsProps {
  card: CardType;
}

export const CardDetails = ({ card }: ICardDetailsProps) => {
  const resourceSpace1 = card.resourceSpaces.resourceSpace1 as Resource;
  const resourceSpace2 = card.resourceSpaces.resourceSpace2 as Resource;
  const resourceSpace3 = card.resourceSpaces.resourceSpace3 as Resource;
  const resourceSpace4 = card.resourceSpaces.resourceSpace4 as Resource;
  const colorEnum = card.color as Color;
  return (
    <Box
      bg={primaryCardColorMap[card.color as Color]}
      padding="$3.5"
      borderRadius="$md"
      w="$full"
      minHeight="$48"
      justifyContent="space-between"
    >
      <HStack justifyContent="space-between" w="$full">
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace1} />
        <CardName color={colorEnum} name={card.name} />
        <CardAge age={card.age} color={colorEnum} />
      </HStack>
      <VStack gap="$5" paddingVertical="$5">
        {/* NOTE: using map instead of Flatlist due to small amount of data + removing Virtualized list inside scrollview error */}
        {card.dogmaEffects.map((effect, index) => (
          <DogmaEffect
            key={`${card.name}_dogmaEffect_${index}`}
            color={colorEnum}
            effectDescription={effect.description}
            isDemand={effect.isDemand}
          />
        ))}
      </VStack>
      <HStack justifyContent="space-between" w="$full">
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace2} />
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace3} />
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace4} />
      </HStack>
    </Box>
  );
};
