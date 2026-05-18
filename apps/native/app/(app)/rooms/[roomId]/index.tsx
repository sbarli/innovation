import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { SocketEvent } from '@inno/constants';
import { api } from '../../../../src/api/client';
import { useRoom } from '../../../../src/rooms/useRooms';
import { useSupabase } from '../../../../src/supabase/SupabaseProvider';
import { useSocket } from '../../../../src/websockets/SocketProvider';

export default function RoomScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { user } = useSupabase();
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { data: room, isLoading } = useRoom(roomId ?? '');
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit(SocketEvent.JOIN_ROOM, { roomId });

    const refreshRoom = () => queryClient.invalidateQueries({ queryKey: ['room', roomId] });

    const handleGameStarted = (gameState: { game: { id: string } }) => {
      router.replace(`/rooms/${roomId}/game/${gameState.game.id}`);
    };

    socket.on(SocketEvent.USER_JOINED_ROOM, refreshRoom);
    socket.on(SocketEvent.USER_LEFT_ROOM, refreshRoom);
    socket.on(SocketEvent.GAME_STARTED, handleGameStarted);

    return () => {
      socket.off(SocketEvent.USER_JOINED_ROOM, refreshRoom);
      socket.off(SocketEvent.USER_LEFT_ROOM, refreshRoom);
      socket.off(SocketEvent.GAME_STARTED, handleGameStarted);
    };
  }, [socket, roomId, queryClient]);

  const handleStartGame = async () => {
    if (!roomId) return;
    setStarting(true);
    try {
      const result = await api.gameplay.newGame({ params: { roomId }, body: {} });
      if (result.status !== 201) {
        const body = result.body as { message?: string };
        Alert.alert('Error', body?.message ?? 'Failed to start game');
      }
    } catch {
      Alert.alert('Error', 'Failed to start game');
    } finally {
      setStarting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!room) {
    return (
      <View style={styles.center}>
        <Text>Room not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isHost = room.hostId === user?.id;
  const canStart = isHost && room.members.length === 2;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: room.name }} />

      <Text style={styles.subtitle}>Lobby</Text>
      <Text style={styles.sectionLabel}>Players ({room.members.length}/2)</Text>

      <FlatList
        data={room.members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.username[0].toUpperCase()}</Text>
            </View>
            <Text style={styles.memberName}>
              {item.username}
              {item.id === room.hostId ? '  👑' : ''}
              {item.id === user?.id ? '  (You)' : ''}
            </Text>
          </View>
        )}
        style={styles.list}
      />

      {isHost ? (
        <TouchableOpacity
          style={[styles.startButton, (!canStart || starting) && styles.disabled]}
          onPress={handleStartGame}
          disabled={!canStart || starting}
        >
          {starting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.startText}>
              {canStart ? 'Start Game' : 'Waiting for 2nd player...'}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.waitingBox}>
          <Text style={styles.waitingText}>Waiting for host to start...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 16 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 10, textTransform: 'uppercase' },
  list: { flexGrow: 0, marginBottom: 24 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f3f4f6' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  memberName: { fontSize: 16, color: '#111827' },
  startButton: { backgroundColor: '#059669', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 'auto' },
  disabled: { opacity: 0.5 },
  startText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  waitingBox: { backgroundColor: '#f3f4f6', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 'auto' },
  waitingText: { color: '#6b7280', fontSize: 14 },
  backButton: { marginTop: 12 },
  backText: { color: '#2563eb', fontSize: 14 },
});
