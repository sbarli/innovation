import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCreateRoom } from './useRooms';

interface CreateRoomFormProps {
  onSuccess: (roomId: string) => void;
  onCancel: () => void;
}

export function CreateRoomForm({ onSuccess, onCancel }: CreateRoomFormProps) {
  const [name, setName] = useState('');
  const createRoom = useCreateRoom();

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Validation', 'Room name is required');
      return;
    }
    try {
      const room = await createRoom.mutateAsync(trimmed);
      onSuccess(room.id);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to create room');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Room</Text>
      <TextInput
        style={styles.input}
        placeholder="Room name"
        value={name}
        onChangeText={setName}
        maxLength={64}
        autoFocus
      />
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.createButton, createRoom.isPending && styles.disabled]}
          onPress={handleCreate}
          disabled={createRoom.isPending}
        >
          {createRoom.isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.createText}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', gap: 12 },
  button: { flex: 1, borderRadius: 8, padding: 12, alignItems: 'center' },
  cancelButton: { backgroundColor: '#f3f4f6' },
  createButton: { backgroundColor: '#2563eb' },
  disabled: { opacity: 0.5 },
  cancelText: { color: '#374151', fontWeight: '600', fontSize: 15 },
  createText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
