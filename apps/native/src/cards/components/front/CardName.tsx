import { Color } from '@inno/constants';

import {
  BORDER_COLOR_LIGHT,
  TEXT_COLOR_LIGHT,
  secondaryCardColorMap,
} from '../../../app-core/constants/colors';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';

export interface ICardNameProps {
  color: Color;
  name: string;
}

export const CardName = ({ color, name }: ICardNameProps) => {
  return (
    <Box
      className={` borderColor-${BORDER_COLOR_LIGHT} bg-${secondaryCardColorMap[color]} px-5 py-1 border-1 `}
    >
      <Text size="sm" isTruncated className={` color-${TEXT_COLOR_LIGHT} m-[0px] `}>
        {name}
      </Text>
    </Box>
  );
};
