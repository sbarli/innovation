import { FC } from 'react';

import { Box, Text } from '@gluestack-ui/themed';

import { useCurrentPlayerGameData } from '../../hooks/useCurrentPlayerGameData';

import { SelectStarterCard } from './SelectStarterCard';

export const GameSetup: FC = () => {
  const { currentPlayerGameData } = useCurrentPlayerGameData();

  if (!currentPlayerGameData) {
    return (
      <Box>
        <Text>Missing game data</Text>
      </Box>
    );
  }

  const starterCardMelded = currentPlayerGameData.hand.length === 1;

  if (starterCardMelded) {
    return (
      <Box>
        <Text>You have already melded your starter card.</Text>
        <Text>Waiting for other players to meld their starter cards...</Text>
      </Box>
    );
  }

  return <SelectStarterCard />;
};
