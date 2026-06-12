import { StyleSheet, Text, View } from 'react-native';
import { card as cardDim, radius } from '@inno/ui';

// Age-name lookup indexed by 1-based number
const AGE_NAME: Record<number, string> = {
  1: 'Prehistory',
  2: 'Classical',
  3: 'Medieval',
  4: 'Renaissance',
  5: 'Exploration',
  6: 'Enlightenment',
  7: 'Romance',
  8: 'Modern',
  9: 'Postmodern',
  10: 'Information',
};

// Achievement cost: 5 × age, none for age 10
const achieveCost = (age: number) => (age < 10 ? age * 5 : null);

interface CardBackProps {
  age: number;
  /** 'full' = supply pile / score pile display, 'compact' = small thumbnail */
  variant?: 'full' | 'compact';
}

export function CardBack({ age, variant = 'full' }: CardBackProps) {
  const name = AGE_NAME[age] ?? String(age);
  const cost = achieveCost(age);

  if (variant === 'compact') {
    return (
      <View style={styles.compact}>
        <Text style={styles.compactAge}>{age}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Decorative top band */}
      <View style={styles.topBand} />

      {/* Main face: age numeral + name */}
      <View style={styles.body}>
        <Text style={styles.ageNumeral}>{age}</Text>
        <Text style={styles.ageName}>{name}</Text>

        {cost !== null && (
          <View style={styles.costBadge}>
            <Text style={styles.costLabel}>Achievement</Text>
            <Text style={styles.costValue}>{cost} pts</Text>
          </View>
        )}
      </View>

      {/* Decorative bottom band */}
      <View style={styles.bottomBand} />
    </View>
  );
}

const BACK_BG = '#2c2520';
const BACK_ACCENT = '#4a3e35';
const BACK_TEXT = '#e8dfd0';
const BACK_MUTED = '#a89a8c';
const BACK_BAND = '#1a1510';

const styles = StyleSheet.create({
  card: {
    width: cardDim.handWidth,
    height: cardDim.handHeight,
    borderRadius: cardDim.radius,
    borderWidth: cardDim.borderWidth,
    borderColor: BACK_ACCENT,
    backgroundColor: BACK_BG,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  topBand: {
    height: 8,
    backgroundColor: BACK_BAND,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 2,
  },
  ageNumeral: {
    fontSize: 40,
    fontWeight: '700',
    color: BACK_TEXT,
    lineHeight: 44,
  },
  ageName: {
    fontSize: 10,
    fontWeight: '600',
    color: BACK_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  costBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: BACK_ACCENT,
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 7,
    color: BACK_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  costValue: {
    fontSize: 11,
    fontWeight: '600',
    color: BACK_TEXT,
  },
  bottomBand: {
    height: 8,
    backgroundColor: BACK_BAND,
  },
  // Compact
  compact: {
    width: cardDim.compactWidth,
    height: cardDim.compactHeight,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: BACK_ACCENT,
    backgroundColor: BACK_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactAge: {
    fontSize: 18,
    fontWeight: '700',
    color: BACK_TEXT,
  },
});
