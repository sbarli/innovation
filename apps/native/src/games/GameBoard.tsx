import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButtons } from './ActionButtons';
import { HandDisplay } from './HandDisplay';
import { PlayerBoard } from './PlayerBoard';
import { ScorePile } from './ScorePile';
import { surface, semantic } from '@inno/ui';

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
    const won = game.winnerId === playerId;
    return (
      <View style={styles.gameOver}>
        <Text style={styles.gameOverTitle}>{won ? 'Victory' : 'Defeat'}</Text>
        <Text style={styles.gameOverSub}>{won ? 'A civilization to remember.' : 'History forgets the rest.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Turn status banner */}
      <View
        style={[
          styles.statusBanner,
          { backgroundColor: isMyTurn ? semantic.yourTurn : semantic.statusDark },
        ]}
      >
        <View style={[styles.turnPip, isMyTurn && styles.turnPipActive]} />
        <View style={[styles.turnPip, game.currentActionNumber >= 2 && styles.turnPipActive]} />
        <Text style={styles.statusText}>
          {isMyTurn
            ? `Your turn · action ${game.currentActionNumber} of 2`
            : "Opponent's turn"}
        </Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

        {/* Opponent section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Opponent</Text>
          {opponentDetails ? (
            <>
              <ScorePile
                count={opponentDetails.scorePile.length}
                achievements={opponentDetails.ageAchievements}
              />
              <PlayerBoard board={opponentDetails.board} />
            </>
          ) : (
            <Text style={styles.waiting}>Waiting for opponent to join…</Text>
          )}
        </View>

        {/* My section */}
        {myDetails && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>You</Text>
            <ScorePile
              count={myDetails.scorePile.length}
              achievements={myDetails.ageAchievements}
            />
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
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: surface.linen,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  turnPip: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  turnPipActive: {
    backgroundColor: '#fff',
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    gap: 10,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: surface.cardWhite,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: semantic.borderSubtle,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: semantic.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  waiting: {
    fontSize: 13,
    color: semantic.inkFaint,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
  gameOver: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: surface.linen,
    gap: 8,
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: semantic.ink,
  },
  gameOverSub: {
    fontSize: 16,
    color: semantic.inkMuted,
    fontStyle: 'italic',
  },
});
