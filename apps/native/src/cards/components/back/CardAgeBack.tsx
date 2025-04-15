import {
  CARD_BACK_BORDER_COLOR_LIGHT,
  CARD_BACK_COLOR_DARK,
  CARD_BACK_COLOR_LIGHT,
} from '../../../app-core/constants/colors';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';

export interface ICardAgeBackProps {
  age: number;
}

export const CardAgeBack = ({ age }: ICardAgeBackProps) => {
  return (
    <Box
      className={` borderColor-${CARD_BACK_COLOR_LIGHT} bg-${CARD_BACK_BORDER_COLOR_LIGHT} rounded-2xl h-7 w-7 items-center justify-center border-1 `}
    >
      <Text size="md" className={` color-${CARD_BACK_COLOR_DARK} text-center font-extrabold `}>
        {age}
      </Text>
    </Box>
  );
};
