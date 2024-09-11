import { Color, Resource } from '@inno/constants';

export const BORDER_COLOR_LIGHT = '$trueGray50';
export const TEXT_COLOR_LIGHT = '$trueGray50';

export const primaryCardColorMap = {
  [Color.BLUE]: '$blue100',
  [Color.GREEN]: '$green300',
  [Color.PURPLE]: '$purple200',
  [Color.RED]: '$red300',
  [Color.YELLOW]: '$yellow200',
};

export const secondaryCardColorMap = {
  [Color.BLUE]: '$darkBlue800',
  [Color.GREEN]: '$green900',
  [Color.PURPLE]: '$violet900',
  [Color.RED]: '$red900',
  [Color.YELLOW]: '$yellow800',
};

export const resourceColorMap = {
  [Resource.CASTLES]: '$trueGray900',
  [Resource.CROWNS]: '$yellow500',
  [Resource.FACTORIES]: '$red800',
  [Resource.LEAVES]: '$green900',
  [Resource.LIGHTBULBS]: '$fuchsia800',
  [Resource.TIMEPIECES]: '$blue900',
};
