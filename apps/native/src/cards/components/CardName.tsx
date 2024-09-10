import { Box, Text } from '@gluestack-ui/themed';

import { Color } from '@inno/constants';

import {
  BORDER_COLOR_LIGHT,
  TEXT_COLOR_LIGHT,
  secondaryCardColorMap,
} from '../../app-core/constants/colors';

export interface ICardNameProps {
  color: Color;
  name: string;
}

export const CardName = ({ color, name }: ICardNameProps) => {
  return (
    <Box
      bg={secondaryCardColorMap[color]}
      paddingHorizontal="$5"
      paddingVertical="$1"
      borderWidth="$1"
      borderColor={BORDER_COLOR_LIGHT}
    >
      <Text color={TEXT_COLOR_LIGHT} size="sm" margin={0} isTruncated>
        {name}
      </Text>
    </Box>
  );
};
