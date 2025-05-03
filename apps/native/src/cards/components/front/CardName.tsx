import { Color } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';
import {
  BORDER_COLOR_LIGHT,
  TEXT_COLOR_LIGHT,
  secondaryCardColorMap,
} from '../../../app-core/constants/colors';

export interface ICardNameProps {
  color: Color;
  name: string;
}

export const CardName = ({ color, name }: ICardNameProps) => {
  return (
    <Box
      style={{
        backgroundColor: secondaryCardColorMap[color],
        borderColor: BORDER_COLOR_LIGHT,
      }}
      className={` px-5 py-1 border-1 `}
    >
      <Text size="sm" isTruncated style={{ color: TEXT_COLOR_LIGHT }} className={` m-[0px] `}>
        {name}
      </Text>
    </Box>
  );
};
