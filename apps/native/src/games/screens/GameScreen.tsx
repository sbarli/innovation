import { GameStage } from '@inno/constants';

import { Box } from '../../app-core/components/gluestack/box';
import { ScrollView } from '../../app-core/components/gluestack/scroll-view';
import { StatusBar } from '../../app-core/components/gluestack/status-bar';
import { Text } from '../../app-core/components/gluestack/text';
import { ActiveGame } from '../components/active/ActiveGame';
import { GameSetup } from '../components/setup/GameSetup';
import { useGameContext } from '../state/GameProvider';

export const GameScreen = () => {
  const {
    // ageAchievements,
    boards,
    // deck,
    gameId,
    hands,
    haveNecessaryGameData,
    loadingGameData,
    metadata,
    players,
    // specialAchievements,
  } = useGameContext();

  if (!haveNecessaryGameData) {
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
        {loadingGameData ? (
          <Box className="items-center">
            <Text>Loading data for game {gameId || '...'}</Text>
          </Box>
        ) : null}
        {metadata?.stage === GameStage.SETUP ? <GameSetup /> : null}
        {metadata?.stage === GameStage.ACTIVE ? <ActiveGame /> : null}
        {metadata?.stage === GameStage.COMPLETE ? (
          <Text>We should have a winner: {metadata?.winnerId ?? 'UNKNOWN, WHOOPSIE'}</Text>
        ) : null}
        <ScrollView className="h-[500px]">
          {/* <Text>Age Achievements: {JSON.stringify(ageAchievements, null, 2)}</Text> */}
          <Text>Boards: {JSON.stringify(boards, null, 2)}</Text>
          {/* <Text>Deck: {JSON.stringify(deck, null, 2)}</Text> */}
          <Text>Hands: {JSON.stringify(hands, null, 2)}</Text>
          <Text>Metadata: {JSON.stringify(metadata, null, 2)}</Text>
          <Text>Players: {JSON.stringify(players, null, 2)}</Text>
          {/* <Text>Special Achievements: {JSON.stringify(specialAchievements, null, 2)}</Text> */}
        </ScrollView>
      </Box>
    </>
  );
};
