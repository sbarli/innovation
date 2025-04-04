import { useMemo } from 'react';

import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useGameContext } from '../state/GameProvider';

export const useCurrentPlayerGameData = () => {
  const { user } = useAuthContext();
  const { players } = useGameContext();

  const currentPlayerGameData = useMemo(() => {
    if (!user || !players) {
      return null;
    }
    return players[user._id];
  }, [user, players]);

  return { currentPlayerGameData };
};
