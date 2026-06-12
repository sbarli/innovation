import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cardColors, CardColor, semantic } from '../theme/colors';

// Maps Resource enum values (from @inno/constants) to display glyphs.
// Using Unicode symbols as legible stand-ins until SVG icons are available.
const RESOURCE_GLYPH: Record<string, string> = {
  castles: '⊞',
  crowns: '♛',
  leaves: '❧',
  lightbulbs: '✦',
  factories: '⚙',
  timepieces: '◎',
};

const RESOURCE_LABEL: Record<string, string> = {
  castles: 'C',
  crowns: 'K',
  leaves: 'L',
  lightbulbs: 'B',
  factories: 'F',
  timepieces: 'T',
};

export type ResourceIconSize = 'sm' | 'md' | 'lg';

interface ResourceIconProps {
  resource: string;
  /** Color of the hex container — defaults to neutral ink */
  color?: CardColor | string;
  size?: ResourceIconSize;
}

const SIZE_MAP = {
  sm: { container: 20, font: 10, border: 3 },
  md: { container: 28, font: 14, border: 4 },
  lg: { container: 44, font: 22, border: 6 },
} as const;

export function ResourceIcon({ resource, color, size = 'md' }: ResourceIconProps) {
  const dim = SIZE_MAP[size];
  const glyph = RESOURCE_GLYPH[resource] ?? RESOURCE_LABEL[resource] ?? '?';

  // Determine hex fill color
  let fillColor: string = semantic.ink;
  if (color && color in cardColors) {
    fillColor = cardColors[color as CardColor].base;
  } else if (typeof color === 'string' && color.startsWith('#')) {
    fillColor = color;
  }

  return (
    <View
      style={[
        styles.hex,
        {
          width: dim.container,
          height: dim.container,
          borderRadius: dim.border,
          backgroundColor: fillColor,
        },
      ]}
    >
      <Text style={[styles.glyph, { fontSize: dim.font, lineHeight: dim.container }]}>
        {glyph}
      </Text>
    </View>
  );
}

// Empty icon cell — shown when the position holds the illustration
export function IllustrationCell({ size = 'md' }: { size?: ResourceIconSize }) {
  const dim = SIZE_MAP[size];
  return (
    <View
      style={[
        styles.illus,
        { width: dim.container, height: dim.container, borderRadius: dim.border },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  hex: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  glyph: {
    color: '#fff',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  illus: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    borderStyle: 'dashed',
  },
});
