import { StyleSheet, Text, View } from 'react-native';
import { ResourceIcon, IllustrationCell } from '@inno/ui';
import { cardColors, CardColor, surface, semantic } from '@inno/ui';
import { card as cardDim, radius } from '@inno/ui';

// Icon position layout for a landscape card:
//
//  ┌────────────────────────────────┐
//  │ [TL]          card name    age │  ← top row
//  │         dogma content          │
//  │ [BL]   [BC]   [BR]            │  ← bottom row
//  └────────────────────────────────┘
//
// Splay reveal:
//   right-splay peek: left strip → TL + BL (2 icons)
//   left-splay peek:  right strip → BR     (1 icon)
//   up-splay peek:    bottom strip → BL + BC + BR (3 icons)

interface ResourceSpaces {
  resourceSpace1: string | null; // TL
  resourceSpace2: string | null; // BL
  resourceSpace3: string | null; // BC
  resourceSpace4: string | null; // BR
}

export interface CardFrontProps {
  cardId: string;
  name: string;
  age: number;
  color: string;
  dogmaResource: string;
  resourceSpaces: ResourceSpaces;
  /** 'full' = standalone / hand view, 'compact' = pile thumbnail */
  variant?: 'full' | 'compact';
  selected?: boolean;
}

export function CardFront({
  name,
  age,
  color,
  dogmaResource,
  resourceSpaces,
  variant = 'full',
  selected = false,
}: CardFrontProps) {
  const palette = cardColors[color as CardColor] ?? {
    base: semantic.inkMuted,
    tint: surface.linenAlt,
    border: semantic.border,
    text: semantic.ink,
  };

  const { tl, bl, bc, br } = {
    tl: resourceSpaces.resourceSpace1,
    bl: resourceSpaces.resourceSpace2,
    bc: resourceSpaces.resourceSpace3,
    br: resourceSpaces.resourceSpace4,
  };

  if (variant === 'compact') {
    return (
      <View
        style={[
          styles.compact,
          { borderColor: palette.border, backgroundColor: palette.tint },
          selected && styles.selectedRing,
        ]}
      >
        <View style={[styles.compactStripe, { backgroundColor: palette.base }]} />
        <Text style={[styles.compactAge, { color: palette.text }]}>{age}</Text>
        <Text style={[styles.compactName, { color: palette.text }]} numberOfLines={1}>
          {name}
        </Text>
      </View>
    );
  }

  const iconSize = 'sm';

  return (
    <View
      style={[
        styles.card,
        { borderColor: selected ? palette.base : palette.border },
        selected && styles.selectedRing,
      ]}
    >
      {/* Color stripe across the top */}
      <View style={[styles.stripe, { backgroundColor: palette.base }]} />

      {/* Card body */}
      <View style={[styles.body, { backgroundColor: palette.tint }]}>
        {/* Top row: TL icon + card name + age */}
        <View style={styles.topRow}>
          <View style={styles.tlCell}>
            {tl ? (
              <ResourceIcon resource={tl} color={color as CardColor} size={iconSize} />
            ) : (
              <IllustrationCell size={iconSize} />
            )}
          </View>
          <Text style={[styles.cardName, { color: palette.text }]} numberOfLines={2}>
            {name}
          </Text>
          <Text style={[styles.ageNum, { color: palette.base }]}>{age}</Text>
        </View>

        {/* Dogma resource indicator */}
        <View style={styles.dogmaRow}>
          <ResourceIcon resource={dogmaResource} color={color as CardColor} size="sm" />
          <Text style={[styles.dogmaLabel, { color: palette.text }]}>
            {dogmaResource}
          </Text>
        </View>

        {/* Bottom row: BL · BC · BR icons */}
        <View style={styles.bottomRow}>
          <View style={styles.iconCell}>
            {bl ? (
              <ResourceIcon resource={bl} color={color as CardColor} size={iconSize} />
            ) : (
              <IllustrationCell size={iconSize} />
            )}
          </View>
          <View style={styles.iconCell}>
            {bc ? (
              <ResourceIcon resource={bc} color={color as CardColor} size={iconSize} />
            ) : (
              <IllustrationCell size={iconSize} />
            )}
          </View>
          <View style={styles.iconCell}>
            {br ? (
              <ResourceIcon resource={br} color={color as CardColor} size={iconSize} />
            ) : (
              <IllustrationCell size={iconSize} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardDim.handWidth,
    height: cardDim.handHeight,
    borderRadius: cardDim.radius,
    borderWidth: cardDim.borderWidth,
    overflow: 'hidden',
    backgroundColor: surface.cardWhite,
  },
  stripe: {
    height: cardDim.colorStripeHeight,
    width: '100%',
  },
  body: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  tlCell: {
    flexShrink: 0,
  },
  cardName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 15,
  },
  ageNum: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
    flexShrink: 0,
  },
  dogmaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dogmaLabel: {
    fontSize: 9,
    fontWeight: '500',
    opacity: 0.7,
    textTransform: 'capitalize',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  iconCell: {
    // each cell: either icon or illustration placeholder
  },
  selectedRing: {
    borderWidth: 2.5,
  },
  // Compact variant
  compact: {
    width: cardDim.compactWidth,
    height: cardDim.compactHeight,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  compactAge: {
    fontSize: 14,
    fontWeight: '700',
  },
  compactName: {
    fontSize: 7,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});
