import { FC } from 'react';

import { Color } from '@inno/constants';

import { Box } from '../../app-core/components/gluestack/box';
import {
  CARD_BACK_BORDER_COLOR_LIGHT,
  CARD_BACK_COLOR_LIGHT,
  primaryCardColorMap,
  secondaryCardColorMap,
} from '../../app-core/constants/colors';

export interface IHorizontalEmptyCardSlotProps {
  color?: Color;
}

export const HorizontalEmptyCardSlot: FC<IHorizontalEmptyCardSlotProps> = ({ color }) => {
  return (
    <Box
      style={{
        backgroundColor: color ? primaryCardColorMap[color] : CARD_BACK_COLOR_LIGHT,
        borderColor: color ? secondaryCardColorMap[color] : CARD_BACK_BORDER_COLOR_LIGHT,
      }}
      className={` p-2 rounded-md border-dashed border-2 w-56 h-32 justify-between `}
    />
  );
};
