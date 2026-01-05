import { useEffect, useState } from 'react';

import { router } from 'expo-router';

import { SocketEvent, SocketEventError, SocketEventResponse } from '@inno/constants';
import { useCloseRoomMutation } from '@inno/gql';
import { getCatchErrorMessage } from '@inno/utils';

import { useToast } from '../../app-core/components/gluestack/toast';
import { CustomToast } from '../../app-core/components/toasts/CustomToast';
import { Routes } from '../../app-core/constants/navigation';
import { useSocketContext } from '../../websockets/SocketProvider';

export const useLeaveRoom = ({
  roomId,
  successCallback,
}: {
  roomId: string;
  successCallback?: () => void;
}) => {
  const { socket } = useSocketContext();
  const toast = useToast();

  const [closeRoomMutation, { loading: closeRoomMutationLoading }] = useCloseRoomMutation({
    fetchPolicy: 'no-cache',
  });

  const [errorMsg, setErrorMsg] = useState<string>();
  const [leaveInProgress, setLeaveInProgress] = useState(false);
  const [leaveSuccessful, setLeaveSuccessful] = useState(false);

  const handleLeaveRoomEvent = async () => {
    if (!socket || !socket?.connected) {
      setErrorMsg('Unexpected error occurred. Please refresh and try again!');
      setLeaveInProgress(false);
      return;
    }
    await socket?.emit(
      SocketEvent.CLOSE_ROOM,
      { roomId: roomId },
      (response: SocketEventResponse) => {
        if (!response.success) {
          setErrorMsg(response.error?.message || 'Error leaving room');
          setLeaveInProgress(false);
          return;
        }
        setLeaveInProgress(false);
        setLeaveSuccessful(true);
        if (successCallback) {
          successCallback();
        }
      }
    );
  };

  const handleLeaveRoom = async () => {
    setLeaveInProgress(true);

    closeRoomMutation({
      variables: {
        roomId: roomId,
      },
      onCompleted(data) {
        if (!data?.closeRoom.success) {
          setErrorMsg('An error occurred. Please try again!');
          return;
        }
        handleLeaveRoomEvent();
      },
      onError(error) {
        setErrorMsg(getCatchErrorMessage(error, 'An error occurred. Please try again!'));
      },
    });
  };

  useEffect(() => {
    socket?.on(
      SocketEvent.CLOSE_ROOM_IN_PROGRESS,
      ({ roomId: closedRoomId, initiatedBy }: { roomId: string; initiatedBy: string }) => {
        if (closedRoomId === roomId) {
          toast.show({
            placement: 'top',
            render: ({ id }) => (
              <CustomToast
                id={id}
                title="User Leaving Room"
                description={`${initiatedBy} is leaving the room. Room is being closed. Game is over.`}
              />
            ),
          });
        }
      }
    );
    socket?.on(SocketEvent.CLOSE_ROOM_SUCCESS, () => {
      setErrorMsg('');
      router.push(Routes.HOME.path);
    });
    socket?.on(SocketEvent.CLOSE_ROOM_ERROR, (error: SocketEventError) => {
      setErrorMsg(error.message);
    });

    return () => {
      socket?.removeListener(SocketEvent.CLOSE_ROOM_ERROR);
      socket?.removeListener(SocketEvent.CLOSE_ROOM_IN_PROGRESS);
      socket?.removeListener(SocketEvent.CLOSE_ROOM_SUCCESS);
    };
  }, [roomId, socket, toast]);

  return {
    errorMsg,
    loading: leaveInProgress || closeRoomMutationLoading,
    leaveSuccessful,
    handleLeaveRoom,
  };
};
