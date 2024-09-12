import { Color, Resource } from '@inno/constants';

// TODO: ADD TO GLUESTACK THEME
const BROWN_PALLETE = {
  brown100: '#fdf8f1',
  brown200: '#f4dfc6',
  brown300: '#e7c6a0',
  brown400: '#d6ac7d',
  brown500: '#c0935e',
  brown600: '#aa7942',
  brown700: '#8b6841',
  brown800: '#6f583e',
  brown900: '#564839',
};

export const BORDER_COLOR_LIGHT = '$trueGray50';
export const TEXT_COLOR_LIGHT = '$trueGray50';
export const TEXT_COLOR_DARK = '$trueGray900';
export const CARD_BACK_BORDER_COLOR_LIGHT = BROWN_PALLETE.brown100;
export const CARD_BACK_COLOR_LIGHT = BROWN_PALLETE.brown200;
export const CARD_BACK_COLOR_DARK = BROWN_PALLETE.brown900;

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

export const tertiaryCardColorMap = {
  [Color.BLUE]: '$blue50',
  [Color.GREEN]: '$green100',
  [Color.PURPLE]: '$purple50',
  [Color.RED]: '$red200',
  [Color.YELLOW]: '$yellow50',
};

export const resourceColorMap = {
  [Resource.CASTLES]: '$trueGray900',
  [Resource.CROWNS]: '$yellow500',
  [Resource.FACTORIES]: '$red800',
  [Resource.LEAVES]: '$green900',
  [Resource.LIGHTBULBS]: '$fuchsia800',
  [Resource.TIMEPIECES]: '$blue900',
};
