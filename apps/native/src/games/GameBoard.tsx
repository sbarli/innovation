import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButtons } from './ActionButtons';
import { HandDisplay } from './HandDisplay';
import { PlayerBoard } from './PlayerBoard';
import { ScorePile } from './ScorePile';

interface ColorPile {
  cards: string[];
  splay: string | null;
}

interface PlayerDetails {
  id: string;
  gameId: string;
  playerId: string;
  board: Record<string, ColorPile>;
  hand: string[];
  scorePile: string[];
  ageAchievements: string[];
  specialAchievements: string[];
}

interface Game {
  id: string;
  roomId: string;
  stage: string;
  currentPlayerId: string;
  currentActionNumber: number;
  winnerId: string | null;
  deck: Record<string, string[]>;
  ageAchievements: Record<string, string | null>;
}

interface GameBoardProps {
  game: Game;
  playerDetails: PlayerDetails[];
  playerId: string;
  onDraw: () => Promise<void>;
  onMeld: (cardId: string) => Promise<void>;
  onAchieve: (age: number) => Promise<void>;
  isSubmitting: boolean;
}

export function GameBoard({ game, playerDetails, playerId, onDraw, onMeld, onAchieve, isSubmitting }: GameBoardProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const myDetails = playerDetails.find((p) => p.playerId === playerId);
  const opponentDetails = playerDetails.find((p) => p.playerId !== playerId);
  const isMyTurn = game.currentPlayerId === playerId;

  const availableAchievements = Object.entries(game.ageAchievements)
    .filter(([, cardId]) => cardId !== null)
    .map(([age]) => Number(age));

  const handleMeld = async () => {
    if (!selectedCard) return;
    await onMeld(selectedCard);
    setSelectedCard(null);
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCard((prev) => (prev === cardId ? null : cardId));
  };

  if (game.stage === 'complete') {
    return (
      <View style={styles.gameOver}>
        <Text style={styles.gameOverTitle}>Game Over</Text>
        <Text style={styles.gameOverText}>
          {game.winnerId === playerId ? 'You win! 🎉' : 'You lose.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Opponent section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Opponent</Text>
        {opponentDetails ? (
          <View>
            <ScorePile count={opponentDetails.scorePile.length} />
            <Text style={styles.achieveInfo}>
              Achievements: {opponentDetails.ageAchievements.join(', ') || 'none'}
            </Text>
            <PlayerBoard board={opponentDetails.board} />
          </View>
        ) : (
          <Text style={styles.waiting}>Waiting for opponent...</Text>
        )}
      </View>

      {/* Game status */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          {isMyTurn ? '▼ Your turn' : '▲ Opponent\'s turn'} · Action {game.currentActionNumber}/2
        </Text>
      </View>

      {/* My section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>You</Text>
        {myDetails ? (
          <View>
            <ScorePile count={myDetails.scorePile.length} />
            <Text style={styles.achieveInfo}>
              Achievements: {myDetails.ageAchievements.join(', ') || 'none'}
            </Text>
            <PlayerBoard board={myDetails.board} />
            <HandDisplay
              hand={myDetails.hand}
              selectedCard={selectedCard}
              onCardSelect={handleCardSelect}
            />
            <ActionButtons
              isMyTurn={isMyTurn}
              selectedCard={selectedCard}
              availableAchievements={availableAchievements}
              myScoreCount={myDetails.scorePile.length}
              onDraw={onDraw}
              onMeld={handleMeld}
              onAchieve={onAchieve}
              isSubmitting={isSubmitting}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, paddingBottom: 32 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#6b7280', marginBottom: 6, textTransform: 'uppercase' },
  achieveInfo: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  waiting: { fontSize: 14, color: '#9ca3af', textAlign: 'center', paddingVertical: 8 },
  statusBar: {
    backgroundColor: '#1e3a5f',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  statusText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  gameOver: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  gameOverTitle: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  gameOverText: { fontSize: 20, color: '#374151' },
});
