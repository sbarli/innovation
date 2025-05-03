import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';
import {
  CARD_BACK_BORDER_COLOR_LIGHT,
  CARD_BACK_COLOR_DARK,
  CARD_BACK_COLOR_LIGHT,
} from '../../../app-core/constants/colors';

export interface ICardAgeBackProps {
  age: number;
}

export const CardAgeBack = ({ age }: ICardAgeBackProps) => {
  return (
    <Box
      style={{
        borderColor: CARD_BACK_COLOR_LIGHT,
        backgroundColor: CARD_BACK_BORDER_COLOR_LIGHT,
      }}
      className={` rounded-2xl h-7 w-7 items-center justify-center border-1 `}
    >
      <Text
        size="md"
        style={{
          color: CARD_BACK_COLOR_DARK,
        }}
        className={` text-center font-extrabold `}
      >
        {age}
      </Text>
    </Box>
  );
};
