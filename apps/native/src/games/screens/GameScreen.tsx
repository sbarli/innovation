import { useEffect } from 'react';

import { Box, ScrollView, StatusBar, Text } from '@gluestack-ui/themed';

import { GameStage } from '@inno/constants';

import { GameSetup } from '../components/setup/GameSetup';
import { useGameContext } from '../state/GameProvider';

export interface IGameScreenProps {
  gameId: string;
}

export const GameScreen = ({ gameId }: IGameScreenProps) => {
  const {
    ageAchievements,
    boards,
    deck,
    hands,
    fetchGameData,
    loadingGameData,
    metadata,
    players,
    specialAchievements,
  } = useGameContext();

  const isMissingGameData =
    !ageAchievements || !specialAchievements || !deck || !players || !metadata || !hands || !boards;

  useEffect(() => {
    fetchGameData(gameId);
  }, []);

  if (isMissingGameData) {
    return (
      <>
        <StatusBar />
        <Box alignItems="center">
          <Text>Mising data for game {gameId || '...'}</Text>
        </Box>
      </>
    );
  }
  return (
    <>
      <StatusBar />
      <Box alignItems="center">
        <Text>Welcome to the Game Screen for game {gameId || '...'}</Text>
        {!!loadingGameData && (
          <Box alignItems="center">
            <Text>Loading data for game {gameId || '...'}</Text>
          </Box>
        )}
        {metadata.stage === GameStage.SETUP && <GameSetup />}
        <ScrollView h="$full">
          <Text>Age Achievements: {JSON.stringify(ageAchievements, null, 2)}</Text>
          <Text>Boards: {JSON.stringify(boards, null, 2)}</Text>
          <Text>Deck: {JSON.stringify(deck, null, 2)}</Text>
          <Text>Hands: {JSON.stringify(hands, null, 2)}</Text>
          <Text>Metadata: {JSON.stringify(metadata, null, 2)}</Text>
          <Text>Players: {JSON.stringify(players, null, 2)}</Text>
          <Text>Special Achievements: {JSON.stringify(specialAchievements, null, 2)}</Text>
        </ScrollView>
      </Box>
    </>
  );
};
