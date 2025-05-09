import { useState } from 'react';

import { Nullable } from '@inno/constants';
import { useMeldFromHandMutation } from '@inno/gql';

import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useGameContext } from '../state/GameProvider';

export const useMeldCard = () => {
  const { user } = useAuthContext();
  const { gameId } = useGameContext();
  const [meldFromHandMutation, { loading: meldFromHandMutationLoading }] = useMeldFromHandMutation({
    fetchPolicy: 'no-cache',
  });
  const [errorMsg, setErrorMsg] = useState<Nullable<string>>(null);

  const meldCardFromHand = ({
    cardId,
    countAsAction = true,
    isStarterMeld = false,
    onSuccess,
  }: {
    cardId: string;
    countAsAction?: boolean;
    isStarterMeld?: boolean;
    onSuccess?: () => void;
  }) => {
    if (!user || !gameId) {
      console.error('User not authenticated');
      return;
    }
    meldFromHandMutation({
      variables: {
        meldInput: {
          cardRef: cardId,
          countAsAction,
          gameRef: gameId,
          isStarterMeld,
          playerRef: user._id,
          meldType: 'fromHand',
        },
      },
      onCompleted(data) {
        if (
          !data?.meld?.playerId ||
          !data?.meld?.updatedPlayerBoard ||
          !data?.meld?.metadata?.updatedPlayerHand
        ) {
          setErrorMsg('An error occurred. Missing expected response data.');
          return;
        }
        if (onSuccess) {
          onSuccess();
        }
      },
      onError(e: unknown) {
        console.error('meldCardFromHand: error: ', e);
        setErrorMsg('An error occurred.');
      },
    });
  };

  return {
    error: errorMsg,
    loading: meldFromHandMutationLoading,
    meldCardFromHand,
  };
};
