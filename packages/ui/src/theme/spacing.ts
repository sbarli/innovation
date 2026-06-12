// Inno design system — spacing & sizing tokens

export const radius = {
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14,
  full: 9999,
} as const;

export const card = {
  // Full landscape card (tablet)
  width: 280,
  height: 175,
  // Hand card
  handWidth: 200,
  handHeight: 125,
  // Compact (in pile overview)
  compactWidth: 80,
  compactHeight: 50,
  // Icon cell inside card
  iconCellSize: 36,
  iconSize: 22,
  radius: 8,
  borderWidth: 2,
  colorStripeHeight: 5,
  // Splay peek widths (what shows beneath the top card)
  peekLeft: 28,   // left-splay: 1 icon strip
  peekRight: 52,  // right-splay: 2 icon strip
  peekUp: 32,     // up-splay: bottom strip height
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
} as const;
