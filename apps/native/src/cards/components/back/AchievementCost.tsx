import { Box, Text } from '@gluestack-ui/themed';

import { AgeString, ageCostToAchieveMap } from '@inno/constants';

import { CARD_BACK_COLOR_DARK, CARD_BACK_COLOR_LIGHT } from '../../../app-core/constants/colors';

export interface IAchievementCostProps {
  age: AgeString;
}

export const AchievementCost = ({ age }: IAchievementCostProps) => {
  const cost = ageCostToAchieveMap[age];
  if (!cost) {
    return null;
  }
  return (
    <Box
      bg={CARD_BACK_COLOR_LIGHT}
      borderRadius="$full"
      borderWidth="$1"
      borderColor={CARD_BACK_COLOR_DARK}
      h="$5"
      w="$5"
      alignItems="center"
      justifyContent="center"
    >
      <Text color={CARD_BACK_COLOR_DARK} textAlign="center" size="xs" fontWeight="$semibold">
        {cost}
      </Text>
    </Box>
  );
};
