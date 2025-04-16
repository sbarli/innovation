import { Color, Resource } from '@inno/constants';
import { Card as CardType } from '@inno/gql';

import { Box } from '../../../app-core/components/gluestack/box';
import { HStack } from '../../../app-core/components/gluestack/hstack';
import { VStack } from '../../../app-core/components/gluestack/vstack';
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
      className={` bg-${primaryCardColorMap[card.color as Color]} p-3.5 rounded-md w-full min-h-48 justify-between `}
    >
      <HStack className="justify-between w-full">
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace1} />
        <CardName color={colorEnum} name={card.name} />
        <CardAge age={card.age} color={colorEnum} />
      </HStack>
      <VStack className="gap-5 py-5">
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
      <HStack className="justify-between w-full">
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace2} />
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace3} />
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace4} />
      </HStack>
    </Box>
  );
};
