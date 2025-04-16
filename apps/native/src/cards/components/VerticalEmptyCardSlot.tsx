import { Box } from '../../app-core/components/gluestack/box';
import {
  CARD_BACK_BORDER_COLOR_LIGHT,
  CARD_BACK_COLOR_LIGHT,
} from '../../app-core/constants/colors';

export const VerticalEmptyCardSlot = () => {
  return (
    <Box
      className={` borderColor-${CARD_BACK_COLOR_LIGHT} bg-${CARD_BACK_BORDER_COLOR_LIGHT} p-2 rounded-md border-dashed border-2 w-32 h-48 justify-between `}
    />
  );
};
