import { useCallback, useEffect, useState } from 'react';

import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { Socket } from 'socket.io-client';

import { SocketEvent, SocketEventError, SocketEventResponse } from '@inno/constants';
import { useAddPlayerToRoomMutation } from '@inno/gql';
import { getCatchErrorMessage } from '@inno/utils';

import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { Routes } from '../../app-core/constants/navigation';
import { JoinRoomForm } from '../forms/JoinRoomForm';
import { JoinRoomFormData } from '../room.types';

export interface IJoinRoomCTAProps {
  socket?: Socket;
}

export const JoinRoomCTA = ({ socket }: IJoinRoomCTAProps) => {
  const [addPlayerToRoomMutation, { loading: addPlayerToRoomMutationLoading }] =
    useAddPlayerToRoomMutation({
      fetchPolicy: 'no-cache',
    });

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [joinInProgress, setJoinInProgress] = useState(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleJoinRoom = async (roomId: string) => {
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
        setShowModal(false);
        router.push({
          pathname: Routes.ROOM,
          params: { roomId },
        });
      }
    );
  };

  const handleSubmit = async (data: JoinRoomFormData) => {
    setJoinInProgress(true);

    addPlayerToRoomMutation({
      variables: {
        roomId: data.roomId,
      },
      onCompleted(data) {
        if (!data?.addPlayerToRoom?._id) {
          setErrorMsg('An error occurred. Please try again!');
          setJoinInProgress(false);
          return;
        }
        handleJoinRoom(data?.addPlayerToRoom._id);
      },
      onError(error) {
        setErrorMsg(getCatchErrorMessage(error, 'An error occurred. Please try again!'));
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

  return (
    <Box>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Join Room</ButtonText>
      </Button>
      <InteractiveModal headerText="Join a Room" onClose={handleClose} showModal={showModal}>
        <>
          <Text>Already know the id for the room you want to join?</Text>
          <Text>Enter it here to get playing faster!</Text>
          <JoinRoomForm
            error={errorMsg}
            loading={joinInProgress || addPlayerToRoomMutationLoading}
            onSubmit={handleSubmit}
          />
        </>
      </InteractiveModal>
    </Box>
  );
};
