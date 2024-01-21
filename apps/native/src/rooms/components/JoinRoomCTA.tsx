import { useCallback, useState } from 'react';

import { Button, ButtonText, Center } from '@gluestack-ui/themed';
import { router } from 'expo-router';

import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { Routes } from '../../app-core/constants/navigation';
import { JoinRoomForm } from '../forms/JoinRoomForm';

export const JoinRoomCTA = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleJoinedRoom = useCallback((roomId: string) => {
    setShowModal(false);
    router.push({
      pathname: Routes.ROOM,
      params: { roomId },
    });
  }, []);

  return (
    <Center h={300}>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Join Room</ButtonText>
      </Button>
      <InteractiveModal
        cancelText="Cancel"
        headerText="Join a Room"
        onClose={handleClose}
        showModal={showModal}
      >
        <JoinRoomForm onJoinSuccess={handleJoinedRoom} />
      </InteractiveModal>
    </Center>
  );
};
