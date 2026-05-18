import { StyleSheet, Text, View } from 'react-native';

const COLORS = ['blue', 'red', 'green', 'purple', 'yellow'] as const;

const COLOR_MAP: Record<string, string> = {
  blue: '#3b82f6',
  red: '#ef4444',
  green: '#22c55e',
  purple: '#a855f7',
  yellow: '#eab308',
};

interface ColorPile {
  cards: string[];
  splay: string | null;
}

interface PlayerBoardProps {
  board: Record<string, ColorPile>;
}

export function PlayerBoard({ board }: PlayerBoardProps) {
  return (
    <View style={styles.board}>
      {COLORS.map((color) => {
        const pile = board[color] ?? { cards: [], splay: null };
        const topCard = pile.cards[0] ?? null;
        return (
          <View key={color} style={[styles.pile, { borderColor: COLOR_MAP[color] }]}>
            <View style={[styles.colorDot, { backgroundColor: COLOR_MAP[color] }]} />
            {topCard ? (
              <Text style={styles.topCard} numberOfLines={1}>{topCard}</Text>
            ) : (
              <Text style={styles.empty}>—</Text>
            )}
            <Text style={styles.count}>×{pile.cards.length}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  board: { flexDirection: 'row', gap: 6, marginVertical: 8 },
  pile: {
    flex: 1,
    minHeight: 64,
    borderWidth: 2,
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
  },
  colorDot: { width: 10, height: 10, borderRadius: 5 },
  topCard: { fontSize: 8, color: '#374151', textAlign: 'center' },
  empty: { fontSize: 16, color: '#d1d5db' },
  count: { fontSize: 10, color: '#6b7280', fontWeight: '600' },
});
