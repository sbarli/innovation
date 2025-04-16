import { useCallback, useState } from 'react';

import { router } from 'expo-router';

import { Box } from '../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../app-core/components/gluestack/button';
import { Text } from '../../app-core/components/gluestack/text';
import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { Routes } from '../../app-core/constants/navigation';
import { JoinRoomForm } from '../forms/JoinRoomForm';
import { useJoinRoom } from '../hooks/useJoinRoom';
import { JoinRoomFormData } from '../room.types';
import { useRoomContext } from '../state/RoomProvider';

export const JoinRoomCTA = () => {
  const { updateCurrentRoomId } = useRoomContext();
  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSuccessfulJoinRoom = (roomId: string) => {
    setShowModal(false);
    updateCurrentRoomId(roomId);
    router.push({
      pathname: Routes.ROOM,
      params: { roomId },
    });
  };

  const {
    handleJoinRoom,
    errorMsg,
    loading: joinLoading,
  } = useJoinRoom({ successCallback: handleSuccessfulJoinRoom });

  const handleSubmit = async (data: JoinRoomFormData) => {
    handleJoinRoom(data.roomId);
  };

  return (
    <Box>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Join Room</ButtonText>
      </Button>
      <InteractiveModal headerText="Join a Room" onClose={handleClose} showModal={showModal}>
        <>
          <Text>Already know the id for the room you want to join?</Text>
          <Text>Enter it here to get playing faster!</Text>
          <JoinRoomForm error={errorMsg} loading={joinLoading} onSubmit={handleSubmit} />
        </>
      </InteractiveModal>
    </Box>
  );
};
