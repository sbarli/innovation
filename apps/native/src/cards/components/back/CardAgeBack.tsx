import { Box, Text } from '@gluestack-ui/themed';

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
      bg={CARD_BACK_BORDER_COLOR_LIGHT}
      borderRadius="$2xl"
      h="$7"
      w="$7"
      alignItems="center"
      justifyContent="center"
      borderWidth="$1"
      borderColor={CARD_BACK_COLOR_LIGHT}
    >
      <Text color={CARD_BACK_COLOR_DARK} textAlign="center" size="md" fontWeight="$extrabold">
        {age}
      </Text>
    </Box>
  );
};
