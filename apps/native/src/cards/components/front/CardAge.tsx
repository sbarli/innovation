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
      style={{
        borderColor: BORDER_COLOR_LIGHT,
        backgroundColor: secondaryCardColorMap[color],
      }}
      className="p-1 rounded-full border-1 h-7 w-7"
    >
      <Text size="sm" style={{ color: TEXT_COLOR_LIGHT }} className="text-center">
        {age}
      </Text>
    </Box>
  );
};
