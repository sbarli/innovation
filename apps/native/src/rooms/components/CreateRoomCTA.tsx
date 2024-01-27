import { useCallback, useEffect, useState } from 'react';

import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Socket } from 'socket.io-client';

import { SocketEvent, SocketEventError } from '@inno/constants';
import { GetRoomsForPlayerDocument, useCreateRoomMutation } from '@inno/gql';

import { getCatchErrorMessage } from '../../../../../packages/utils/dist';
import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
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
    socket?.on(SocketEvent.JOIN_ROOM_SUCCESS, () => {
      setShowModal(false);
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
    <Box>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Create Room</ButtonText>
      </Button>
      <InteractiveModal headerText="Create a Room" onClose={handleClose} showModal={showModal}>
        <>
          <Text>Give your new room a name</Text>
          <CreateRoomForm
            error={errorMsg}
            loading={createRoomMutationLoading}
            onSubmit={handleSubmit}
          />
        </>
      </InteractiveModal>
    </Box>
  );
};
