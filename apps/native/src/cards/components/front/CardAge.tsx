import { Color } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';
import {
  BORDER_COLOR_LIGHT,
  TEXT_COLOR_LIGHT,
  secondaryCardColorMap,
} from '../../../app-core/constants/colors';

export interface ICardAgeProps {
  age: number;
  color: Color;
}

export const CardAge = ({ color, age }: ICardAgeProps) => {
  return (
    <Box
      className={` borderColor-${BORDER_COLOR_LIGHT} bg-${secondaryCardColorMap[color]} p-1 rounded-full border-1 h-7 w-7 `}
    >
      <Text size="sm" className={` color-${TEXT_COLOR_LIGHT} text-center `}>
        {age}
      </Text>
    </Box>
  );
};
