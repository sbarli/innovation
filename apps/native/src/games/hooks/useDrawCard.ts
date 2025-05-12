import { useState } from 'react';

import { Age, Nullable } from '@inno/constants';
import { useDrawMutation } from '@inno/gql';

import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useGameContext } from '../state/GameProvider';

export const useDrawCard = () => {
  const { user } = useAuthContext();
  const { gameId } = useGameContext();
  const [drawMutation, { loading: drawMutationLoading }] = useDrawMutation({
    fetchPolicy: 'no-cache',
  });
  const [errorMsg, setErrorMsg] = useState<Nullable<string>>(null);

  const drawCardAction = ({ onSuccess }: { onSuccess?: (ageDrawn: Age) => void }) => {
    if (!user || !gameId) {
      console.error('User not authenticated');
      return;
    }
    drawMutation({
      variables: {
        drawInput: {
          countAsAction: true,
          drawType: 'highestBoardAge',
          gameRef: gameId,
          playerRef: user._id,
        },
      },
      onCompleted(data) {
        // TODO: handle winner case
        if (!data?.draw?.playerId || !data?.draw?.ageDrawn) {
          setErrorMsg('An error occurred. Missing expected response data.');
          return;
        }
        if (onSuccess) {
          onSuccess(data.draw.ageDrawn as Age);
        }
      },
      onError(e: unknown) {
        console.error('drawCardAction: error: ', e);
        setErrorMsg('An error occurred.');
      },
    });
  };

  return {
    error: errorMsg,
    loading: drawMutationLoading,
    drawCardAction,
  };
};
