import { useEffect, useState } from 'react';

import { SocketEvent, SocketEventError, SocketEventResponse } from '@inno/constants';
import { useAddPlayerToRoomMutation } from '@inno/gql';

import { useSocketContext } from '../../websockets/SocketProvider';

export const useJoinRoom = ({
  successCallback,
}: {
  successCallback?: (roomId: string) => void;
}) => {
  const { socket } = useSocketContext();
  const [addPlayerToRoomMutation, { loading: addPlayerToRoomMutationLoading }] =
    useAddPlayerToRoomMutation({
      fetchPolicy: 'no-cache',
    });

  const [errorMsg, setErrorMsg] = useState<string>();
  const [joinInProgress, setJoinInProgress] = useState(false);
  const [joinSuccessful, setJoinSuccessful] = useState(false);

  const handleJoinRoomEvent = async (roomId: string) => {
    if (!socket || !socket?.connected) {
      setErrorMsg('Unexpected error occurred. Please refresh and try again!');
      setJoinInProgress(false);
      return;
    }
    await socket?.emit(
      SocketEvent.JOIN_ROOM,
      { roomId: roomId },
      (response: SocketEventResponse) => {
        if (!response.success) {
          setErrorMsg(response.error?.message || 'Error joining room');
          setJoinInProgress(false);
          return;
        }
        setJoinInProgress(false);
        setJoinSuccessful(true);
        if (successCallback) {
          successCallback(roomId);
        }
      }
    );
  };

  const handleJoinRoom = async (roomId: string) => {
    setJoinInProgress(true);

    addPlayerToRoomMutation({
      variables: {
        roomId,
      },
      onCompleted(data) {
        if (!data?.addPlayerToRoom?._id) {
          setErrorMsg('An error occurred. Please try again.');
          setJoinInProgress(false);
          return;
        }
        handleJoinRoomEvent(data?.addPlayerToRoom._id);
      },
      onError() {
        setErrorMsg('An error occurred. Check the Room ID and try again.');
        setJoinInProgress(false);
      },
    });
  };

  useEffect(() => {
    socket?.on(SocketEvent.JOIN_ROOM_ERROR, (error: SocketEventError) => {
      setErrorMsg(error.message);
    });

    return () => {
      socket?.removeListener(SocketEvent.JOIN_ROOM_ERROR);
    };
  }, [socket]);

  return {
    errorMsg,
    loading: joinInProgress || addPlayerToRoomMutationLoading,
    joinSuccessful,
    handleJoinRoom,
  };
};
