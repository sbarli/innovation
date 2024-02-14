import { useCallback, useEffect, useState } from 'react';

import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { Socket } from 'socket.io-client';

import { SocketEvent, SocketEventError, SocketEventResponse } from '@inno/constants';
import { useCreateRoomMutation } from '@inno/gql';
import { getCatchErrorMessage } from '@inno/utils';

import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { Routes } from '../../app-core/constants/navigation';
import { CreateRoomForm } from '../forms/CreateRoomForm';
import { CreateRoomFormData } from '../room.types';

export interface ICreateRoomCTAProps {
  socket?: Socket;
}

export const CreateRoomCTA = ({ socket }: ICreateRoomCTAProps) => {
  const [createRoomMutation, { loading: createRoomMutationLoading }] = useCreateRoomMutation({
    fetchPolicy: 'no-cache',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [createAndJoinInProgress, setCreateAndJoinInProgress] = useState(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleJoinRoom = async (roomId: string) => {
    if (!socket || !socket?.connected) {
      setErrorMsg('Unexpected error occurred. Please refresh and try again!');
      setCreateAndJoinInProgress(false);
      return;
    }
    await socket?.emit(
      SocketEvent.JOIN_ROOM,
      { roomId: roomId },
      (response: SocketEventResponse) => {
        if (!response.success) {
          setErrorMsg(response.error?.message || 'Error joining room');
          setCreateAndJoinInProgress(false);
          return;
        }
        setCreateAndJoinInProgress(false);
        setShowModal(false);
        router.push({
          pathname: Routes.ROOM,
          params: { roomId },
        });
      }
    );
  };

  const handleSubmit = async (data: CreateRoomFormData) => {
    setCreateAndJoinInProgress(true);
    createRoomMutation({
      variables: {
        newRoomData: data,
      },
      onCompleted(data) {
        if (!data?.createRoom._id) {
          setErrorMsg('An error occurred. Please try again!');
          setCreateAndJoinInProgress(false);
          return;
        }
        handleJoinRoom(data?.createRoom._id);
      },
      onError(error) {
        setErrorMsg(getCatchErrorMessage(error, 'An error occurred. Please try again!'));
        setCreateAndJoinInProgress(false);
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
        <ButtonText>Create Room</ButtonText>
      </Button>
      <InteractiveModal headerText="Create a Room" onClose={handleClose} showModal={showModal}>
        <>
          <Text>Give your new room a name</Text>
          <CreateRoomForm
            error={errorMsg}
            loading={createAndJoinInProgress || createRoomMutationLoading}
            onSubmit={handleSubmit}
          />
        </>
      </InteractiveModal>
    </Box>
  );
};
