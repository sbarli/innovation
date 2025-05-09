import { FC, useEffect } from 'react';

import { SocketEvent } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Text } from '../../../app-core/components/gluestack/text';
import { useToast } from '../../../app-core/components/gluestack/toast';
import { CustomToast } from '../../../app-core/components/toasts/CustomToast';
import { useAuthContext } from '../../../authentication/state/AuthProvider';
import { useSocketContext } from '../../../websockets/SocketProvider';
import { useUserPlayerGameData } from '../../hooks/useUserPlayerGameData';
import { useGameContext } from '../../state/GameProvider';

import { SelectStarterCard } from './SelectStarterCard';

export interface IRoomStarterCardMeldedCallbackProps {
  meldedBy: { username: string; userId: string };
}

export const GameSetup: FC = () => {
  const { user } = useAuthContext();
  const { gameId, hands, players } = useGameContext();
  const { socket } = useSocketContext();
  const userPlayerGameData = useUserPlayerGameData();

  const toast = useToast();

  useEffect(() => {
    socket?.on(
      SocketEvent.ROOM_STARTER_CARD_MELDED,
      ({ meldedBy }: IRoomStarterCardMeldedCallbackProps) => {
        if (gameId && user?._id && user._id !== meldedBy.userId) {
          toast.show({
            placement: 'top',
            render: ({ id }) => (
              <CustomToast
                id={id}
                title="Starter Card Melded"
                description={`${meldedBy.username} has melded their starter card`}
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

  if (!userPlayerGameData || !hands) {
    return (
      <Box>
        <Text>Missing game data</Text>
      </Box>
    );
  }

  // TODO: memoize this
  const currentPlayerStarterCardMelded = userPlayerGameData.hand.length === 1;
  const playersWithStarterCardMelded = Object.keys(hands).reduce((acc, pid) => {
    if (players && hands[pid].length === 1) {
      acc.push(players[pid].username);
    }
    return acc;
  }, [] as string[]);
  const totalPlayers = Object.keys(players ?? {}).length;
  const allPlayersMeldedStarterCard = totalPlayers === playersWithStarterCardMelded.length;

  if (allPlayersMeldedStarterCard) {
    return (
      <Box>
        <Text>All starter cards melded!</Text>
        <Text>This section should be removed once socket logic is in place.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text>
        Waiting for {totalPlayers - playersWithStarterCardMelded.length} of {totalPlayers} players
        to meld...
      </Text>
      <Text>{playersWithStarterCardMelded.join(', ')} have melded their starter card.</Text>
      {!currentPlayerStarterCardMelded ? (
        <SelectStarterCard />
      ) : (
        <Text>You have already melded your starter card.</Text>
      )}
    </Box>
  );
};
