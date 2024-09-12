import { Box } from '@gluestack-ui/themed';

import {
  CARD_BACK_BORDER_COLOR_LIGHT,
  CARD_BACK_COLOR_LIGHT,
} from '../../app-core/constants/colors';

export const VerticalEmptyCardSlot = () => {
  return (
    <Box
      bg={CARD_BACK_BORDER_COLOR_LIGHT}
      padding="$2"
      borderRadius="$md"
      borderStyle="dashed"
      borderWidth="$2"
      borderColor={CARD_BACK_COLOR_LIGHT}
      w="$32"
      h="$48"
      justifyContent="space-between"
    />
  );
};
