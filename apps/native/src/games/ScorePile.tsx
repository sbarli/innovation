import { StyleSheet, Text, View } from 'react-native';
import { surface, semantic } from '@inno/ui';

interface ScorePileProps {
  count: number;
  achievements?: string[];
}

export function ScorePile({ count, achievements = [] }: ScorePileProps) {
  return (
    <View style={styles.row}>
      {/* Score */}
      <View style={styles.pile}>
        <Text style={styles.pileLabel}>Score</Text>
        <View style={styles.pileBadge}>
          <Text style={styles.pileCount}>{count}</Text>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.pile}>
        <Text style={styles.pileLabel}>Achievements</Text>
        <View style={styles.achieveRow}>
          {achievements.length === 0 ? (
            <Text style={styles.none}>—</Text>
          ) : (
            achievements.map((a, i) => (
              <View key={i} style={styles.achieveBadge}>
                <Text style={styles.achieveText}>{a}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
  },
  pile: {
    gap: 3,
  },
  pileLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: semantic.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  pileBadge: {
    backgroundColor: surface.linenAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    minWidth: 32,
    alignItems: 'center',
  },
  pileCount: {
    fontSize: 16,
    fontWeight: '700',
    color: semantic.ink,
  },
  achieveRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  achieveBadge: {
    backgroundColor: semantic.achievement,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  achieveText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  none: {
    fontSize: 13,
    color: semantic.inkFaint,
  },
});
