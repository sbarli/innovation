import { Box, Image } from '@gluestack-ui/themed';

import { Color, Resource } from '@inno/constants';

import castleImage from '../../../assets/resources/castle.png';
import crownImage from '../../../assets/resources/crown.png';
import factoryImage from '../../../assets/resources/factory.png';
import leafImage from '../../../assets/resources/leaf.png';
import lightbulbImage from '../../../assets/resources/lightbulb.png';
import timepieceImage from '../../../assets/resources/timepiece.png';
import {
  BORDER_COLOR_LIGHT,
  resourceColorMap,
  secondaryCardColorMap,
} from '../../app-core/constants/colors';

const resourceToResourceImageMap = {
  [Resource.CASTLES]: castleImage,
  [Resource.CROWNS]: crownImage,
  [Resource.FACTORIES]: factoryImage,
  [Resource.LEAVES]: leafImage,
  [Resource.LIGHTBULBS]: lightbulbImage,
  [Resource.TIMEPIECES]: timepieceImage,
};

export interface IResourceSpaceProps {
  cardColor: Color;
  resource?: Resource;
}

export const ResourceSpace = ({ cardColor, resource }: IResourceSpaceProps) => {
  return (
    <Box
      borderColor={secondaryCardColorMap[cardColor]}
      borderWidth="$2"
      bg={resource ? resourceColorMap[resource] : '$black'}
      w="$8"
      h="$8"
    >
      <Box
        borderWidth="$1"
        borderColor={BORDER_COLOR_LIGHT}
        w="$full"
        h="$full"
        alignItems="center"
        justifyContent="center"
      >
        {resource ? (
          <Image
            alt={`${resource} icon`}
            role="img"
            size="sm"
            source={resourceToResourceImageMap[resource]}
            h="$6"
            w="$6"
          />
        ) : (
          <Box bg="$black" />
        )}
      </Box>
    </Box>
  );
};
