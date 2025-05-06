import { GameStage } from '@inno/constants';

import { Box } from '../../app-core/components/gluestack/box';
import { StatusBar } from '../../app-core/components/gluestack/status-bar';
import { Text } from '../../app-core/components/gluestack/text';
import { ActiveGame } from '../components/active/ActiveGame';
import { GameSetup } from '../components/setup/GameSetup';
import { useGameContext } from '../state/GameProvider';

export const GameScreen = () => {
  const { gameId, haveNecessaryGameData, loadingGameData, metadata } = useGameContext();

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
      </Box>
    </>
  );
};
