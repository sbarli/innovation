import { AgeString, ageCostToAchieveMap } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';
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
      style={{
        borderColor: CARD_BACK_COLOR_DARK,
        backgroundColor: CARD_BACK_COLOR_LIGHT,
      }}
      className={` rounded-full border-1 h-5 w-5 items-center justify-center `}
    >
      <Text
        size="xs"
        style={{
          color: CARD_BACK_COLOR_DARK,
        }}
        className={` text-center font-semibold `}
      >
        {cost}
      </Text>
    </Box>
  );
};
