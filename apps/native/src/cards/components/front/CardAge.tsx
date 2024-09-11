import { Box, Text } from '@gluestack-ui/themed';

import { Color } from '@inno/constants';

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
      bg={secondaryCardColorMap[color]}
      padding="$1"
      borderRadius="$full"
      borderWidth="$1"
      borderColor={BORDER_COLOR_LIGHT}
      h="$7"
      w="$7"
    >
      <Text color={TEXT_COLOR_LIGHT} textAlign="center" size="sm">
        {age}
      </Text>
    </Box>
  );
};
