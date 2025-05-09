import { Color, Resource } from '@inno/constants';
import { Card as CardType } from '@inno/gql';

import { Box } from '../../../app-core/components/gluestack/box';
import { HStack } from '../../../app-core/components/gluestack/hstack';
import { primaryCardColorMap } from '../../../app-core/constants/colors';

import { CardAge } from './CardAge';
import { CardName } from './CardName';
import { ResourceSpace } from './ResourceSpace';

export interface ICardFrontProps {
  card: CardType;
}

export const CardFront = ({ card }: ICardFrontProps) => {
  const resourceSpace1 = card.resourceSpaces.resourceSpace1 as Resource;
  const resourceSpace2 = card.resourceSpaces.resourceSpace2 as Resource;
  const resourceSpace3 = card.resourceSpaces.resourceSpace3 as Resource;
  const resourceSpace4 = card.resourceSpaces.resourceSpace4 as Resource;
  const colorEnum = card.color as Color;
  return (
    <Box
      style={{
        backgroundColor: primaryCardColorMap[card.color as Color],
      }}
      className={` max-w-56 p-3.5 rounded-md h-32 justify-between `}
    >
      <HStack className="justify-between w-full">
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace1} />
        <CardName color={colorEnum} name={card.name} />
        <CardAge age={card.age} color={colorEnum} />
      </HStack>
      <HStack className="justify-between w-full">
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace2} />
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace3} />
        <ResourceSpace cardColor={colorEnum} resource={resourceSpace4} />
      </HStack>
    </Box>
  );
};
