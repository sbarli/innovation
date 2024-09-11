import { Box, HStack, Text } from '@gluestack-ui/themed';

import { ageStringToAgeNameMap, cardAgeToAgeStringMap } from '@inno/constants';

import {
  CARD_BACK_BORDER_COLOR_LIGHT,
  CARD_BACK_COLOR_DARK,
  CARD_BACK_COLOR_LIGHT,
} from '../../../app-core/constants/colors';

import { AchievementCost } from './AchievementCost';
import { CardAgeBack } from './CardAgeBack';

export interface ICardBackProps {
  age: number;
}

export const CardBack = ({ age }: ICardBackProps) => {
  const ageStr = cardAgeToAgeStringMap[age];
  const ageName = ageStringToAgeNameMap[ageStr];
  return (
    <Box
      bg={CARD_BACK_BORDER_COLOR_LIGHT}
      padding="$2"
      borderRadius="$md"
      borderWidth="$2"
      borderColor={CARD_BACK_COLOR_LIGHT}
      w="$32"
      h="$48"
      justifyContent="space-between"
    >
      <Box
        bg={CARD_BACK_COLOR_LIGHT}
        w="$full"
        h="$full"
        justifyContent="space-between"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        borderBottomLeftRadius="$lg"
        borderBottomRightRadius="$lg"
        borderWidth="$1"
        borderColor={CARD_BACK_COLOR_DARK}
      >
        <HStack justifyContent="space-between">
          <CardAgeBack age={age} />
          <CardAgeBack age={age} />
        </HStack>
        <Text color={CARD_BACK_COLOR_DARK} fontWeight="$bold" alignSelf="center" size="sm">
          {ageName}
        </Text>
        <Box paddingBottom="$3" paddingRight="$2" alignSelf="flex-end">
          <AchievementCost age={ageStr} />
        </Box>
      </Box>
    </Box>
  );
};
