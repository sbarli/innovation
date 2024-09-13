import { Box } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';

import { Color } from '@inno/constants';

import {
  TEXT_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  secondaryCardColorMap,
  tertiaryCardColorMap,
} from '../../../app-core/constants/colors';

export interface IDogmaEffectProps {
  color: Color;
  effectDescription: string;
  isDemand: boolean;
}

export const DogmaEffect = ({ color, effectDescription, isDemand = false }: IDogmaEffectProps) => {
  return (
    <Box
      bg={isDemand ? secondaryCardColorMap[color] : tertiaryCardColorMap[color]}
      paddingVertical="$1"
      paddingHorizontal="$3"
      marginHorizontal="$2"
    >
      <Text color={isDemand ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK} size="sm">
        {effectDescription}
      </Text>
    </Box>
  );
};
