// Inno design system — typography tokens
// Newsreader (display) · Spectral (body) · Outfit (sans UI) · IBM Plex Mono
// Loaded via expo-font; fall back to system serifs/sans until fonts load.

export const fontFamily = {
  // Serif — card names, dogma text, display headings
  displaySerif: 'Newsreader_400Regular',
  displaySerifItalic: 'Newsreader_400Regular_Italic',
  displaySerifMedium: 'Newsreader_500Medium',
  displaySerifSemibold: 'Newsreader_600SemiBold',
  // Body serif — dogma flavor text, card body
  bodySerif: 'Spectral_400Regular',
  bodySerifItalic: 'Spectral_400Regular_Italic',
  bodySerifMedium: 'Spectral_500Medium',
  bodySerifSemibold: 'Spectral_600SemiBold',
  // Sans — UI chrome, labels, buttons, lobby
  sans: 'Outfit_400Regular',
  sansMedium: 'Outfit_500Medium',
  sansSemibold: 'Outfit_600SemiBold',
  sansBold: 'Outfit_700Bold',
  // Mono — debug overlays, card IDs
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
} as const;

// System fallbacks for before fonts load
export const fontFamilyFallback = {
  serif: 'Georgia',
  sans: 'System',
  mono: 'Courier',
} as const;

export const fontSize = {
  // Card-specific
  cardAge: 22,
  cardName: 13,
  cardDogma: 11,
  cardBack: 36,
  // UI chrome
  actionLabel: 15,
  actionSub: 12,
  sectionLabel: 11,
  badge: 13,
  // General
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  '2xl': 24,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const lineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.4,
  relaxed: 1.6,
} as const;
