import { useMemo } from 'react';

import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useGameContext } from '../state/GameProvider';

export const useCurrentPlayerGameData = () => {
  const { user } = useAuthContext();
  const { players, hands, boards } = useGameContext();

  const currentPlayerGameData = useMemo(() => {
    if (!user?._id || !players?.[user._id] || !hands?.[user._id] || !boards?.[user._id]) {
      return null;
    }
    return {
      board: boards[user._id],
      hand: hands[user._id],
      metadata: players[user._id],
    };
  }, [user, players, hands, boards]);

  return currentPlayerGameData;
};
