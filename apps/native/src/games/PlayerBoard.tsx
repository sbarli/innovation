import { StyleSheet, Text, View } from 'react-native';
import { cardColors, CardColor } from '@inno/ui';
import { card as cardDim } from '@inno/ui';

const COLORS = ['blue', 'red', 'green', 'purple', 'yellow'] as const;

interface ColorPile {
  cards: string[];
  splay: string | null;
}

interface PlayerBoardProps {
  board: Record<string, ColorPile>;
}

// Splay peek strip shown for each card beneath the top card
type SplayDir = 'left' | 'right' | 'up' | null;

function SplayPeek({ color, splay, count }: { color: string; splay: SplayDir; count: number }) {
  if (count <= 1 || !splay) return null;

  const palette = cardColors[color as CardColor];
  const peekCount = count - 1;

  if (splay === 'left') {
    // Right strip visible — show BR position peek
    return (
      <View style={styles.peekLeftContainer}>
        {Array.from({ length: peekCount }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.peekLeftStrip,
              { backgroundColor: palette.tint, borderColor: palette.border },
              { right: i * (cardDim.peekLeft + 2) },
            ]}
          />
        ))}
      </View>
    );
  }

  if (splay === 'right') {
    // Left strip visible — TL + BL columns
    return (
      <View style={styles.peekRightContainer}>
        {Array.from({ length: peekCount }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.peekRightStrip,
              { backgroundColor: palette.tint, borderColor: palette.border },
              { left: i * (cardDim.peekRight + 2) },
            ]}
          />
        ))}
      </View>
    );
  }

  if (splay === 'up') {
    // Bottom strip visible — BL + BC + BR
    return (
      <View style={styles.peekUpContainer}>
        {Array.from({ length: peekCount }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.peekUpStrip,
              { backgroundColor: palette.tint, borderColor: palette.border },
              { top: i * (cardDim.peekUp + 2) },
            ]}
          />
        ))}
      </View>
    );
  }

  return null;
}

function ColorLane({ color, pile }: { color: string; pile: ColorPile }) {
  const palette = cardColors[color as CardColor];
  const splay = (pile.splay?.toLowerCase() as SplayDir) ?? null;
  const isEmpty = pile.cards.length === 0;

  return (
    <View style={styles.lane}>
      {/* Splay label */}
      {splay && (
        <Text style={[styles.splayLabel, { color: palette.base }]}>
          {splay === 'left' ? '←' : splay === 'right' ? '→' : '↑'}
        </Text>
      )}

      {/* Pile area */}
      <View style={styles.pileArea}>
        {isEmpty ? (
          // Empty pile — tinted placeholder showing color at a glance
          <View
            style={[
              styles.emptyPile,
              { backgroundColor: palette.tint, borderColor: palette.border },
            ]}
          >
            <View style={[styles.emptyDot, { backgroundColor: palette.base }]} />
          </View>
        ) : (
          <View style={styles.stackContainer}>
            {/* Peek strips for cards beneath the top */}
            <SplayPeek color={color} splay={splay} count={pile.cards.length} />

            {/* Top card face — compact */}
            <View
              style={[
                styles.topCardFace,
                {
                  backgroundColor: palette.tint,
                  borderColor: palette.border,
                },
              ]}
            >
              <View style={[styles.topCardStripe, { backgroundColor: palette.base }]} />
              <Text style={[styles.topCardLabel, { color: palette.text }]} numberOfLines={1}>
                {pile.cards.length}×
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Color label */}
      <Text style={[styles.colorLabel, { color: palette.base }]}>{color}</Text>
    </View>
  );
}

export function PlayerBoard({ board }: PlayerBoardProps) {
  return (
    <View style={styles.board}>
      {COLORS.map((color) => {
        const pile = board[color] ?? { cards: [], splay: null };
        return <ColorLane key={color} color={color} pile={pile} />;
      })}
    </View>
  );
}

const PILE_W = 56;
const PILE_H = 70;

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 6,
  },
  lane: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  splayLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  pileArea: {
    width: PILE_W,
    height: PILE_H,
    position: 'relative',
  },
  emptyPile: {
    width: PILE_W,
    height: PILE_H,
    borderRadius: 6,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    opacity: 0.4,
  },
  stackContainer: {
    width: PILE_W,
    height: PILE_H,
    position: 'relative',
  },
  topCardFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: PILE_W,
    height: PILE_H,
    borderRadius: 6,
    borderWidth: 1.5,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 4,
    zIndex: 10,
  },
  topCardStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  topCardLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  // Splay peek strips
  peekLeftContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: PILE_H,
    zIndex: 5,
  },
  peekLeftStrip: {
    position: 'absolute',
    top: 0,
    width: cardDim.peekLeft,
    height: PILE_H,
    borderRadius: 4,
    borderWidth: 1,
    opacity: 0.7,
  },
  peekRightContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: PILE_H,
    zIndex: 5,
  },
  peekRightStrip: {
    position: 'absolute',
    top: 0,
    width: cardDim.peekRight,
    height: PILE_H,
    borderRadius: 4,
    borderWidth: 1,
    opacity: 0.7,
  },
  peekUpContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  peekUpStrip: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: cardDim.peekUp,
    borderRadius: 4,
    borderWidth: 1,
    opacity: 0.7,
  },
  colorLabel: {
    fontSize: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
