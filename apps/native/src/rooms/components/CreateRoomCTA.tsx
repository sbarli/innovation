import { useCallback, useEffect, useState } from 'react';

import { Button, ButtonText, Center } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { Socket } from 'socket.io-client';

import { SocketEvent, SocketEventError } from '@inno/constants';
import { GetRoomsForPlayerDocument, Room, useCreateRoomMutation } from '@inno/gql';

import { getCatchErrorMessage } from '../../../../../packages/utils/dist';
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
    refetchQueries: [GetRoomsForPlayerDocument],
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSubmit = async (data: CreateRoomFormData) => {
    createRoomMutation({
      variables: {
        newRoomData: data,
      },
      onCompleted(data) {
        if (!data?.createRoom._id) {
          setErrorMsg('An error occurred. Please try again!');
          return;
        }
        socket?.emit(SocketEvent.JOIN_ROOM, { roomId: data.createRoom._id });
      },
      onError(error) {
        setErrorMsg(getCatchErrorMessage(error, 'An error occurred. Please try again!'));
      },
    });
  };

  useEffect(() => {
    socket?.on(SocketEvent.JOIN_ROOM_SUCCESS, (room: Room) => {
      setShowModal(false);
      router.push({
        pathname: Routes.ROOM,
        params: { roomId: room._id },
      });
    });
    socket?.on(SocketEvent.JOIN_ROOM_ERROR, (error: SocketEventError) => {
      setErrorMsg(error.message);
    });
    return () => {
      socket?.removeListener(SocketEvent.JOIN_ROOM_SUCCESS);
      socket?.removeListener(SocketEvent.JOIN_ROOM_ERROR);
    };
  }, [socket]);

  return (
    <Center h={300}>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Create Room</ButtonText>
      </Button>
      <InteractiveModal
        cancelText="Cancel"
        headerText="Create a Room"
        onClose={handleClose}
        showModal={showModal}
      >
        <CreateRoomForm
          error={errorMsg}
          loading={createRoomMutationLoading}
          onSubmit={handleSubmit}
        />
      </InteractiveModal>
    </Center>
  );
};
