import { StyleSheet, Text, View } from 'react-native';

interface ScorePileProps {
  count: number;
}

export function ScorePile({ count }: ScorePileProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Score</Text>
      <View style={styles.badge}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 4 },
  label: { fontSize: 13, color: '#6b7280' },
  badge: { backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2 },
  count: { fontSize: 14, fontWeight: '600', color: '#111827' },
});
