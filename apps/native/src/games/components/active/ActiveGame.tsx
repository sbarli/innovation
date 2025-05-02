import { FC } from 'react';

import { GameStage } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';
import { useCurrentPlayerGameData } from '../../hooks/useCurrentPlayerGameData';
import { useGameContext } from '../../state/GameProvider';

import { StatsDrawer } from './game-stats/StatsDrawer';

export const ActiveGame: FC = () => {
  const { metadata } = useGameContext();
  const { currentPlayerGameData } = useCurrentPlayerGameData();

  if (!currentPlayerGameData || metadata?.stage !== GameStage.ACTIVE) {
    return (
      <Box>
        <Text>Uh oh, missing active game data!</Text>
      </Box>
    );
  }

  return (
    <Box>
      <StatsDrawer />
      <Text>WELCOME TO THE ACTIVE GAME!!</Text>
    </Box>
  );
};
