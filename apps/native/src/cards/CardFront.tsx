import { StyleSheet, Text, View } from 'react-native';

const COLOR_BG: Record<string, string> = {
  blue: '#dbeafe',
  red: '#fee2e2',
  green: '#dcfce7',
  purple: '#f3e8ff',
  yellow: '#fef9c3',
};

const COLOR_BORDER: Record<string, string> = {
  blue: '#3b82f6',
  red: '#ef4444',
  green: '#22c55e',
  purple: '#a855f7',
  yellow: '#eab308',
};

interface ResourceSpaces {
  resourceSpace1: string | null;
  resourceSpace2: string | null;
  resourceSpace3: string | null;
  resourceSpace4: string | null;
}

interface CardFrontProps {
  cardId: string;
  name: string;
  age: number;
  color: string;
  dogmaResource: string;
  resourceSpaces: ResourceSpaces;
  compact?: boolean;
}

export function CardFront({ cardId, name, age, color, dogmaResource, resourceSpaces, compact }: CardFrontProps) {
  const bg = COLOR_BG[color] ?? '#f9fafb';
  const border = COLOR_BORDER[color] ?? '#9ca3af';
  const spaces = [resourceSpaces.resourceSpace1, resourceSpaces.resourceSpace2, resourceSpaces.resourceSpace3, resourceSpaces.resourceSpace4];

  if (compact) {
    return (
      <View style={[styles.compact, { backgroundColor: bg, borderColor: border }]}>
        <Text style={styles.compactAge}>{age}</Text>
        <Text style={styles.compactName} numberOfLines={1}>{name}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor: border }]}>
      <View style={styles.header}>
        <Text style={styles.age}>{age}</Text>
        <Text style={styles.resource}>{dogmaResource[0].toUpperCase()}</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      <View style={styles.spaces}>
        {spaces.map((s, i) => (
          <View key={i} style={styles.space}>
            <Text style={styles.spaceText}>{s ? s[0].toUpperCase() : '◻'}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.cardId} numberOfLines={1}>{cardId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 112,
    borderRadius: 6,
    borderWidth: 2,
    padding: 6,
    justifyContent: 'space-between',
  },
  compact: {
    width: 48,
    height: 64,
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  age: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
  resource: { fontSize: 12, color: '#6b7280' },
  name: { fontSize: 10, fontWeight: '600', color: '#111827', flex: 1 },
  spaces: { flexDirection: 'row', gap: 2 },
  space: { width: 14, height: 14, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
  spaceText: { fontSize: 8, color: '#374151' },
  cardId: { fontSize: 7, color: '#9ca3af' },
  compactAge: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  compactName: { fontSize: 8, color: '#374151' },
});
