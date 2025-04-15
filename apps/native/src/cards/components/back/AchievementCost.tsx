import { AgeString, ageCostToAchieveMap } from '@inno/constants';

import { CARD_BACK_COLOR_DARK, CARD_BACK_COLOR_LIGHT } from '../../../app-core/constants/colors';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';

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
      className={` borderColor-${CARD_BACK_COLOR_DARK} bg-${CARD_BACK_COLOR_LIGHT} rounded-full border-1 h-5 w-5 items-center justify-center `}
    >
      <Text size="xs" className={` color-${CARD_BACK_COLOR_DARK} text-center font-semibold `}>
        {cost}
      </Text>
    </Box>
  );
};
