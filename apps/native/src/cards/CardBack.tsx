import { StyleSheet, Text, View } from 'react-native';

interface CardBackProps {
  age: number;
  compact?: boolean;
}

export function CardBack({ age, compact }: CardBackProps) {
  return (
    <View style={[styles.card, compact && styles.compact]}>
      <Text style={styles.age}>{age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 60,
    height: 84,
    backgroundColor: '#374151',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6b7280',
  },
  compact: { width: 40, height: 56 },
  age: { fontSize: 20, fontWeight: 'bold', color: '#d1d5db' },
});
