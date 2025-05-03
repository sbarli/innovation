import { useCallback, useState } from 'react';

import { router } from 'expo-router';

import { useCreateRoomMutation } from '@inno/gql';

import { Box } from '../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../app-core/components/gluestack/button';
import { Text } from '../../app-core/components/gluestack/text';
import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { Routes } from '../../app-core/constants/navigation';
import { CreateRoomForm } from '../forms/CreateRoomForm';
import { useJoinRoom } from '../hooks/useJoinRoom';
import { CreateRoomFormData } from '../room.types';
import { useRoomContext } from '../state/RoomProvider';

export const CreateRoomCTA = () => {
  const { updateCurrentRoomId } = useRoomContext();
  const [createRoomMutation, { loading: createRoomMutationLoading }] = useCreateRoomMutation({
    fetchPolicy: 'no-cache',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [createAndJoinInProgress, setCreateAndJoinInProgress] = useState(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSuccessfulJoinRoom = (roomId: string) => {
    setCreateAndJoinInProgress(false);
    setShowModal(false);
    updateCurrentRoomId(roomId);
    router.push({
      pathname: Routes.ROOM.path,
      params: { roomId },
    });
  };

  const {
    handleJoinRoom,
    errorMsg: joinErrorMsg,
    loading: joinLoading,
  } = useJoinRoom({ successCallback: handleSuccessfulJoinRoom });

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
      onError() {
        setErrorMsg('An error occurred. Please try again!');
        setCreateAndJoinInProgress(false);
      },
    });
  };

  return (
    <Box>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Create Room</ButtonText>
      </Button>
      <InteractiveModal headerText="Create a Room" onClose={handleClose} showModal={showModal}>
        <>
          <Text>Give your new room a name</Text>
          <CreateRoomForm
            error={errorMsg || joinErrorMsg}
            loading={createAndJoinInProgress || createRoomMutationLoading || joinLoading}
            onSubmit={handleSubmit}
          />
        </>
      </InteractiveModal>
    </Box>
  );
};
