import { ageStringToAgeNameMap, cardAgeToAgeStringMap } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { HStack } from '../../../app-core/components/gluestack/hstack';
import { Text } from '../../../app-core/components/gluestack/text';
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
      style={{
        borderColor: CARD_BACK_COLOR_LIGHT,
        backgroundColor: CARD_BACK_BORDER_COLOR_LIGHT,
      }}
      className={` p-2 rounded-md border-2 w-32 h-48 justify-between `}
    >
      <Box
        // TODO: fix this
        // borderTopLeftRadius="$3xl"
        // borderTopRightRadius="$3xl"
        // borderBottomLeftRadius="$lg"
        // borderBottomRightRadius="$lg"
        style={{
          borderColor: CARD_BACK_COLOR_DARK,
          backgroundColor: CARD_BACK_COLOR_LIGHT,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        className={` w-full h-full justify-between border-1 `}
      >
        <HStack className="justify-between">
          <CardAgeBack age={age} />
          <CardAgeBack age={age} />
        </HStack>
        <Text
          size="sm"
          style={{
            color: CARD_BACK_COLOR_DARK,
          }}
          className={` font-bold self-center `}
        >
          {ageName}
        </Text>
        <Box className="pb-3 pr-2 self-end">
          <AchievementCost age={ageStr} />
        </Box>
      </Box>
    </Box>
  );
};
