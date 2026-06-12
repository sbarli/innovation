// Inno design system — color tokens
// Five card colors sit slightly under, like aged ink on parchment.
// Each pairs with a soft tint for dogma backgrounds.

export const cardColors = {
  purple: {
    base: '#6b4fa0',
    tint: '#f0ebff',
    border: '#8b6bbf',
    text: '#3d2b6b',
  },
  red: {
    base: '#b83232',
    tint: '#fdf0ef',
    border: '#d04545',
    text: '#7a1f1f',
  },
  yellow: {
    base: '#b8820e',
    tint: '#fdf7e3',
    border: '#d4a020',
    text: '#7a5600',
  },
  blue: {
    base: '#2a5fa8',
    tint: '#ebf4ff',
    border: '#3d72c0',
    text: '#1a3d70',
  },
  green: {
    base: '#2a6645',
    tint: '#ebf8f1',
    border: '#3d7d57',
    text: '#1a4530',
  },
} as const;

export type CardColor = keyof typeof cardColors;

// Backgrounds — warm tabletop linen
export const surface = {
  linen: '#faf7f2',
  linenAlt: '#f3ede4',
  tableTop: '#e8dfd0',
  tableTopDark: '#1e1b14',
  cardWhite: '#fefcf8',
  overlay: 'rgba(0,0,0,0.55)',
} as const;

// Semantic UI colors
export const semantic = {
  // Toasts / alerts
  demand: '#b83232',      // red — demands
  demandBg: '#fdf0ef',
  share: '#2a5fa8',       // blue — shares
  shareBg: '#ebf4ff',
  achievement: '#b8820e', // yellow — achievements
  achievementBg: '#fdf7e3',
  yourTurn: '#2a6645',    // green — your turn accent
  yourTurnBg: '#ebf8f1',

  // Status bar
  statusDark: '#1e3a5f',
  statusLight: '#f0f6ff',

  // Neutral
  ink: '#1c1410',
  inkMuted: '#6b5e52',
  inkFaint: '#a89a8c',
  border: '#d8cfc4',
  borderSubtle: '#ede8e0',
} as const;

// Dark theme overrides (swap as needed with useColorScheme)
export const darkSurface = {
  linen: '#1e1b14',
  linenAlt: '#261f16',
  tableTop: '#14120d',
  cardWhite: '#2a2418',
} as const;

export const darkSemantic = {
  ink: '#f5f0e8',
  inkMuted: '#a89a8c',
  inkFaint: '#6b5e52',
  border: '#3a3228',
  borderSubtle: '#2a2418',
} as const;
