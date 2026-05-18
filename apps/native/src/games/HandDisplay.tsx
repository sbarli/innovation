import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HandDisplayProps {
  hand: string[];
  selectedCard?: string | null;
  onCardSelect?: (cardId: string) => void;
}

export function HandDisplay({ hand, selectedCard, onCardSelect }: HandDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hand ({hand.length})</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {hand.length === 0 ? (
          <Text style={styles.empty}>Empty hand</Text>
        ) : (
          hand.map((cardId) => (
            <TouchableOpacity
              key={cardId}
              style={[styles.card, selectedCard === cardId && styles.selected]}
              onPress={() => onCardSelect?.(cardId)}
            >
              <Text style={styles.cardText} numberOfLines={2}>{cardId}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  scroll: { flexGrow: 0 },
  card: {
    width: 70,
    height: 90,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 8,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: { borderColor: '#2563eb', backgroundColor: '#dbeafe' },
  cardText: { fontSize: 9, textAlign: 'center', color: '#111827' },
  empty: { fontSize: 13, color: '#9ca3af', paddingVertical: 8 },
});
