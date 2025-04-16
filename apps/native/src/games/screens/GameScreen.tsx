import { useEffect } from 'react';

import { GameStage } from '@inno/constants';

import { Box } from '../../app-core/components/gluestack/box';
import { ScrollView } from '../../app-core/components/gluestack/scroll-view';
import { StatusBar } from '../../app-core/components/gluestack/status-bar';
import { Text } from '../../app-core/components/gluestack/text';
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
        <Box className="items-center">
          <Text>Mising data for game {gameId || '...'}</Text>
        </Box>
      </>
    );
  }
  return (
    <>
      <StatusBar />
      <Box className="items-center">
        <Text>Welcome to the Game Screen for game {gameId || '...'}</Text>
        {!!loadingGameData && (
          <Box className="items-center">
            <Text>Loading data for game {gameId || '...'}</Text>
          </Box>
        )}
        {metadata.stage === GameStage.SETUP && <GameSetup />}
        <ScrollView>
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
