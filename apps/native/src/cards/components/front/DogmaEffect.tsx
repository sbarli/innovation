import { Color } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';
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
      style={{
        backgroundColor: isDemand ? secondaryCardColorMap[color] : tertiaryCardColorMap[color],
      }}
      className={` py-1 px-3 mx-2 `}
    >
      <Text size="sm" style={{ color: isDemand ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK }}>
        {effectDescription}
      </Text>
    </Box>
  );
};
