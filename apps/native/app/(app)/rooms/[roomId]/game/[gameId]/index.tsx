import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../../../src/api/client';
import { GameBoard } from '../../../../../../src/games/GameBoard';
import { useGame } from '../../../../../../src/games/useGame';
import { useSupabase } from '../../../../../../src/supabase/SupabaseProvider';

export default function GameScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { user } = useSupabase();
  const queryClient = useQueryClient();
  const { data: gameState, isLoading } = useGame(gameId ?? '');
  const [submitting, setSubmitting] = useState(false);

  const updateFromResult = (result: { status: number; body: unknown }) => {
    if (result.status === 200 || result.status === 201) {
      queryClient.setQueryData(['game', gameId], result.body);
    } else {
      const body = result.body as { message?: string };
      Alert.alert('Error', body?.message ?? 'Action failed');
    }
  };

  const handleDraw = async () => {
    if (!gameId) return;
    setSubmitting(true);
    try {
      const result = await api.gameplay.draw({ params: { gameId }, body: {} });
      updateFromResult(result);
    } catch {
      Alert.alert('Error', 'Draw failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMeld = async (cardId: string) => {
    if (!gameId) return;
    setSubmitting(true);
    try {
      const result = await api.gameplay.meld({ params: { gameId }, body: { cardId } });
      updateFromResult(result);
    } catch {
      Alert.alert('Error', 'Meld failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAchieve = async (achievementAge: number) => {
    if (!gameId) return;
    setSubmitting(true);
    try {
      const result = await api.gameplay.achieve({ params: { gameId }, body: { achievementAge } });
      updateFromResult(result);
    } catch {
      Alert.alert('Error', 'Achieve failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || !gameState) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading game...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Not authenticated</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Innovation', headerShown: false }} />
      <GameBoard
        game={gameState.game}
        playerDetails={gameState.playerDetails}
        playerId={user.id}
        onDraw={handleDraw}
        onMeld={handleMeld}
        onAchieve={handleAchieve}
        isSubmitting={submitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: '#6b7280', fontSize: 14 },
});
