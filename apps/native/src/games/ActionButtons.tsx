import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { surface, semantic } from '@inno/ui';

interface ActionButtonsProps {
  isMyTurn: boolean;
  selectedCard: string | null;
  availableAchievements: number[];
  myScoreCount: number;
  onDraw: () => void;
  onMeld: () => void;
  onAchieve: (age: number) => void;
  isSubmitting: boolean;
}

export function ActionButtons({
  isMyTurn,
  selectedCard,
  availableAchievements,
  myScoreCount,
  onDraw,
  onMeld,
  onAchieve,
  isSubmitting,
}: ActionButtonsProps) {
  const canDraw = isMyTurn && !isSubmitting;
  const canMeld = isMyTurn && !!selectedCard && !isSubmitting;
  const achievableAges = availableAchievements.filter((age) => myScoreCount >= age * 5);

  if (!isMyTurn) {
    return (
      <View style={styles.container}>
        <View style={styles.waitingBar}>
          <View style={styles.waitingDot} />
          <Text style={styles.waitingText}>Waiting for opponent</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Selection hint */}
      {selectedCard ? (
        <View style={styles.selectionHint}>
          <Text style={styles.selectionLabel}>Selected for meld</Text>
          <Text style={styles.selectionId} numberOfLines={1}>{selectedCard}</Text>
        </View>
      ) : (
        <Text style={styles.hint}>Tap a card in your hand to select it for meld</Text>
      )}

      {/* Primary actions */}
      <View style={styles.actionRow}>
        {/* Draw */}
        <ActionPill
          label="Draw"
          color={semantic.share}
          disabled={!canDraw}
          loading={isSubmitting}
          onPress={onDraw}
        />

        {/* Meld */}
        <ActionPill
          label="Meld"
          color={semantic.yourTurn}
          disabled={!canMeld}
          onPress={onMeld}
        />
      </View>

      {/* Achieve row */}
      {achievableAges.length > 0 && (
        <View style={styles.achieveSection}>
          <Text style={styles.achieveHeader}>Claim achievement</Text>
          <View style={styles.achieveBadges}>
            {achievableAges.map((age) => (
              <TouchableOpacity
                key={age}
                style={[styles.achieveBadge, isSubmitting && styles.disabledOpacity]}
                onPress={() => onAchieve(age)}
                disabled={isSubmitting}
                activeOpacity={0.75}
              >
                <Text style={styles.achieveAge}>{age}</Text>
                <Text style={styles.achieveCost}>{age * 5} pts</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

interface ActionPillProps {
  label: string;
  color: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

function ActionPill({ label, color, disabled, loading, onPress }: ActionPillProps) {
  return (
    <TouchableOpacity
      style={[styles.pill, { backgroundColor: color }, disabled && styles.disabledOpacity]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.pillLabel}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    gap: 10,
  },
  hint: {
    fontSize: 11,
    color: semantic.inkFaint,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  selectionHint: {
    backgroundColor: surface.linenAlt,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    gap: 1,
  },
  selectionLabel: {
    fontSize: 9,
    color: semantic.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  selectionId: {
    fontSize: 12,
    color: semantic.ink,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  disabledOpacity: {
    opacity: 0.35,
  },
  // Achieve
  achieveSection: {
    gap: 6,
  },
  achieveHeader: {
    fontSize: 10,
    fontWeight: '700',
    color: semantic.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  achieveBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achieveBadge: {
    backgroundColor: semantic.achievement,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 1,
  },
  achieveAge: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  achieveCost: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 9,
  },
  // Waiting
  waitingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: surface.linenAlt,
    borderRadius: 10,
  },
  waitingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: semantic.inkFaint,
  },
  waitingText: {
    fontSize: 13,
    color: semantic.inkMuted,
  },
});
