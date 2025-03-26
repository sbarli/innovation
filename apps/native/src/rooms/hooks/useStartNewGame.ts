import { useEffect, useState } from 'react';

import { router, useLocalSearchParams } from 'expo-router';

import { SocketEvent, SocketEventError, SocketEventResponse } from '@inno/constants';
import { CreateNewGameInput, useNewGameMutation, NewGameMutation } from '@inno/gql';

import { Routes } from '../../app-core/constants/navigation';
import { useSocketContext } from '../../websockets/SocketProvider';

export const useStartNewGame = ({
  successCallback,
}: {
  successCallback?: (gameId: string) => void;
}) => {
  const { roomId } = useLocalSearchParams();
  const { socket } = useSocketContext();
  const [newGameMutation, { loading: newGameMutationLoading }] = useNewGameMutation({
    fetchPolicy: 'no-cache',
  });

  const [errorMsg, setErrorMsg] = useState<string>();
  const [startInProgress, setStartInProgress] = useState(false);
  const [startSuccessful, setStartSuccessful] = useState(false);

  const handleRedirectToGameScreen = (gameId: string) => {
    if (typeof roomId === 'string') {
      router.push({
        pathname: Routes.GAME,
        params: {
          roomId,
          gameId,
        },
      });
    }
  };

  const handleStartGameEvent = async ({ gameId }: NewGameMutation['newGame']) => {
    if (!socket || !socket?.connected) {
      setErrorMsg('Unexpected error occurred. Please refresh and try again!');
      setStartInProgress(false);
      return;
    }
    await socket?.emit(
      SocketEvent.START_GAME,
      { gameId: gameId as string, roomId: roomId as string },
      (response: SocketEventResponse) => {
        if (!response.success) {
          setErrorMsg(response.error?.message || 'Error starting game');
          setStartInProgress(false);
          return;
        }
        setStartInProgress(false);
        setStartSuccessful(true);
        handleRedirectToGameScreen(gameId);
        if (successCallback) {
          successCallback(gameId);
        }
      }
    );
  };

  const handleStartGame = async (newRoomData: CreateNewGameInput) => {
    setStartInProgress(true);

    newGameMutation({
      variables: {
        newGameDto: newRoomData,
      },
      onCompleted(data) {
        if (!data?.newGame?.gameId) {
          setErrorMsg('An error occurred. Please try again.');
          setStartInProgress(false);
          return;
        }
        handleStartGameEvent(data.newGame);
      },
      onError() {
        setErrorMsg('An error occurred. Check the Room ID and try again.');
        setStartInProgress(false);
      },
    });
  };

  useEffect(() => {
    socket?.on(SocketEvent.GAME_STARTED, ({ gameId }: { gameId: string }) => {
      handleRedirectToGameScreen(gameId);
    });
    socket?.on(SocketEvent.START_GAME_ERROR, (error: SocketEventError) => {
      setErrorMsg(error.message);
    });

    return () => {
      socket?.removeListener(SocketEvent.START_GAME_ERROR);
    };
  }, [socket]);

  return {
    errorMsg,
    loading: startInProgress || newGameMutationLoading,
    startSuccessful,
    handleStartGame,
  };
};
