import { FC, useEffect } from 'react';

import { Box, Text, useToast } from '@gluestack-ui/themed';

import { SocketEvent } from '@inno/constants';

import { CustomToast } from '../../../app-core/components/toasts/CustomToast';
import { useAuthContext } from '../../../authentication/state/AuthProvider';
import { useSocketContext } from '../../../websockets/SocketProvider';
import { useCurrentPlayerGameData } from '../../hooks/useCurrentPlayerGameData';
import { useGameContext } from '../../state/GameProvider';

import { SelectStarterCard } from './SelectStarterCard';

export const GameSetup: FC = () => {
  const { user } = useAuthContext();
  const { gameId, hands, fetchGameData } = useGameContext();
  const { socket } = useSocketContext();
  const { currentPlayerGameData } = useCurrentPlayerGameData();

  const toast = useToast();

  useEffect(() => {
    socket?.on(
      SocketEvent.GAME_UPDATED,
      ({ username, userId }: { username: string; userId: string }) => {
        if (gameId && user?._id && user._id !== userId) {
          fetchGameData(gameId);
          toast.show({
            placement: 'top',
            render: ({ id }) => (
              <CustomToast
                id={id}
                title="Starter Card Melded"
                description={`${username} has melded their starter card`}
              />
            ),
          });
        }
      }
    );
    return () => {
      socket?.removeListener(SocketEvent.GAME_UPDATED);
    };
  }, [socket]);

  if (!currentPlayerGameData || !hands) {
    return (
      <Box>
        <Text>Missing game data</Text>
      </Box>
    );
  }

  const currentPlayerStarterCardMelded = currentPlayerGameData.hand.length === 1;
  const allPlayersMeldedStarterCard = Object.keys(hands).every((pid) => hands[pid].length === 1);

  if (allPlayersMeldedStarterCard) {
    return (
      <Box>
        <Text>All starter cards melded!</Text>
        <Text>This section should be removed once socket logic is in place.</Text>
      </Box>
    );
  }

  if (currentPlayerStarterCardMelded) {
    return (
      <Box>
        <Text>You have already melded your starter card.</Text>
        <Text>Waiting for other players to meld their starter cards...</Text>
      </Box>
    );
  }

  return <SelectStarterCard />;
};
