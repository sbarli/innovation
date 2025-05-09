import { Color, Resource } from '@inno/constants';

import castleImage from '../../../../assets/resources/castle.png';
import crownImage from '../../../../assets/resources/crown.png';
import factoryImage from '../../../../assets/resources/factory.png';
import leafImage from '../../../../assets/resources/leaf.png';
import lightbulbImage from '../../../../assets/resources/lightbulb.png';
import timepieceImage from '../../../../assets/resources/timepiece.png';
import { Box } from '../../../app-core/components/gluestack/box';
import { Image } from '../../../app-core/components/gluestack/image';
import {
  BORDER_COLOR_LIGHT,
  resourceColorMap,
  secondaryCardColorMap,
} from '../../../app-core/constants/colors';

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
      style={{
        backgroundColor: resource ? resourceColorMap[resource] : 'black',
        borderColor: secondaryCardColorMap[cardColor],
      }}
      className={` border-2 w-8 h-8 `}
    >
      <Box
        style={{
          borderColor: BORDER_COLOR_LIGHT,
        }}
        className={` border-1 w-full h-full items-center justify-center `}
      >
        {resource ? (
          <Image
            alt={`${resource} icon`}
            role="img"
            size="sm"
            source={resourceToResourceImageMap[resource]}
            className="h-6 w-6"
          />
        ) : (
          <Box className="bg-black" />
        )}
      </Box>
    </Box>
  );
};
