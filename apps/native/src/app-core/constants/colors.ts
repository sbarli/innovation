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

export const BORDER_COLOR_LIGHT = '#fafafa';
export const TEXT_COLOR_LIGHT = '#fafafa';
export const TEXT_COLOR_DARK = '#171717';
export const CARD_BACK_BORDER_COLOR_LIGHT = BROWN_PALLETE.brown100;
export const CARD_BACK_COLOR_LIGHT = BROWN_PALLETE.brown200;
export const CARD_BACK_COLOR_DARK = BROWN_PALLETE.brown900;

export const primaryCardColorMap = {
  [Color.BLUE]: '#dbeafe',
  [Color.GREEN]: '#86efac',
  [Color.PURPLE]: '#e9d5ff',
  [Color.RED]: '#fca5a5',
  [Color.YELLOW]: '#fef08a',
};

export const secondaryCardColorMap = {
  [Color.BLUE]: '#002851',
  [Color.GREEN]: '#14532d',
  [Color.PURPLE]: '#4c1d95',
  [Color.RED]: '#7f1d1d',
  [Color.YELLOW]: '#854d0e',
};

export const tertiaryCardColorMap = {
  [Color.BLUE]: '#eff6ff',
  [Color.GREEN]: '#dcfce7',
  [Color.PURPLE]: '#faf5ff',
  [Color.RED]: '#fecaca',
  [Color.YELLOW]: '#fefce8',
};

export const resourceColorMap = {
  [Resource.CASTLES]: '#171717',
  [Resource.CROWNS]: '#eab308',
  [Resource.FACTORIES]: '#991b1b',
  [Resource.LEAVES]: '#14532d',
  [Resource.LIGHTBULBS]: '#86198f',
  [Resource.TIMEPIECES]: '#1e3a8a',
};
