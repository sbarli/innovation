import { useEffect } from 'react';

import { Box, ScrollView, StatusBar, Text } from '@gluestack-ui/themed';

import { useGameContext } from '../state/GameProvider';

export interface IGameScreenProps {
  gameId: string;
}

export const GameScreen = ({ gameId }: IGameScreenProps) => {
  const {
    loadingGameData,
    fetchGameData,
    ageAchievements,
    specialAchievements,
    deck,
    players,
    metadata,
  } = useGameContext();

  const isMissingGameData =
    !ageAchievements || !specialAchievements || !deck || !players || !metadata;

  useEffect(() => {
    fetchGameData(gameId);
  }, []);

  if (loadingGameData) {
    return (
      <>
        <StatusBar />
        <Box alignItems="center">
          <Text>Loading data for game {gameId || '...'}</Text>
        </Box>
      </>
    );
  }
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
        <ScrollView h="$full">
          <Text>Age Achievements: {JSON.stringify(ageAchievements, null, 2)}</Text>
          <Text>Deck: {JSON.stringify(deck, null, 2)}</Text>
          <Text>Metadata: {JSON.stringify(metadata, null, 2)}</Text>
          <Text>Players: {JSON.stringify(players, null, 2)}</Text>
          <Text>Special Achievements: {JSON.stringify(specialAchievements, null, 2)}</Text>
        </ScrollView>
      </Box>
    </>
  );
};
