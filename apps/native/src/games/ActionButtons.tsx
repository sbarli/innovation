import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <Text style={styles.waiting}>Waiting for opponent...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        {selectedCard ? `Selected: ${selectedCard}` : 'Tap a card to select for meld'}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.drawButton, !canDraw && styles.disabled]}
          onPress={onDraw}
          disabled={!canDraw}
        >
          {isSubmitting ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>Draw</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.meldButton, !canMeld && styles.disabled]}
          onPress={onMeld}
          disabled={!canMeld}
        >
          <Text style={styles.buttonText}>Meld</Text>
        </TouchableOpacity>
      </View>

      {achievableAges.length > 0 && (
        <View style={styles.achieveRow}>
          <Text style={styles.achieveLabel}>Claim achievement:</Text>
          <View style={styles.achieveBadges}>
            {achievableAges.map((age) => (
              <TouchableOpacity
                key={age}
                style={[styles.achieveBadge, isSubmitting && styles.disabled]}
                onPress={() => onAchieve(age)}
                disabled={isSubmitting}
              >
                <Text style={styles.achieveText}>Age {age}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  hint: { fontSize: 12, color: '#6b7280', marginBottom: 8, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  button: { flex: 1, borderRadius: 8, padding: 12, alignItems: 'center' },
  drawButton: { backgroundColor: '#2563eb' },
  meldButton: { backgroundColor: '#059669' },
  disabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  waiting: { textAlign: 'center', color: '#6b7280', fontSize: 14, paddingVertical: 12 },
  achieveRow: { marginTop: 4 },
  achieveLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  achieveBadges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  achieveBadge: { backgroundColor: '#f59e0b', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  achieveText: { color: '#fff', fontWeight: '600', fontSize: 13 },
});
