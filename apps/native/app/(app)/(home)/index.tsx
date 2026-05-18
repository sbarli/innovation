import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { CreateRoomForm } from '../../../src/rooms/CreateRoomForm';
import { useJoinRoom, useRooms } from '../../../src/rooms/useRooms';
import { useSupabase } from '../../../src/supabase/SupabaseProvider';

export default function HomeScreen() {
  const [showCreate, setShowCreate] = useState(false);
  const { user, signOut } = useSupabase();
  const queryClient = useQueryClient();
  const { data: rooms, isLoading, refetch } = useRooms();
  const joinRoom = useJoinRoom();

  const handleRoomPress = async (roomId: string, isMember: boolean) => {
    if (isMember) {
      router.push(`/rooms/${roomId}`);
      return;
    }
    try {
      await joinRoom.mutateAsync({ roomId });
      router.push(`/rooms/${roomId}`);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to join room');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    queryClient.clear();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Innovation', headerRight: () => (
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      )}} />

      {showCreate ? (
        <CreateRoomForm
          onSuccess={(roomId) => { setShowCreate(false); router.push(`/rooms/${roomId}`); }}
          onCancel={() => setShowCreate(false)}
        />
      ) : (
        <TouchableOpacity style={styles.createButton} onPress={() => setShowCreate(true)}>
          <Text style={styles.createButtonText}>+ Create Room</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>Your Rooms</Text>
      <FlatList
        data={rooms ?? []}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={() => refetch()}
        renderItem={({ item }) => {
          const isMember = item.members.some((m) => m.id === user?.id);
          return (
            <TouchableOpacity
              style={styles.roomItem}
              onPress={() => handleRoomPress(item.id, isMember)}
            >
              <View style={styles.roomInfo}>
                <Text style={styles.roomName}>{item.name}</Text>
                <Text style={styles.roomMembers}>
                  {item.members.map((m) => m.username).join(', ')} · {item.members.length}/2
                </Text>
              </View>
              <Text style={styles.roomAction}>{isMember ? 'Enter →' : 'Join →'}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No rooms yet. Create one to start playing!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  createButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#374151', marginBottom: 10 },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  roomInfo: { flex: 1 },
  roomName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  roomMembers: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  roomAction: { fontSize: 13, color: '#2563eb', fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 15, color: '#9ca3af', textAlign: 'center' },
  signOutBtn: { paddingHorizontal: 8 },
  signOutText: { color: '#ef4444', fontSize: 14 },
});
