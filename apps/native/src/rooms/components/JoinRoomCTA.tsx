import { useCallback, useState } from 'react';

import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { Socket } from 'socket.io-client';

import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { Routes } from '../../app-core/constants/navigation';
import { JoinRoomForm } from '../forms/JoinRoomForm';

export interface IJoinRoomCTAProps {
  socket?: Socket;
}

export const JoinRoomCTA = ({ socket }: IJoinRoomCTAProps) => {
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
    <Box>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Join Room</ButtonText>
      </Button>
      <InteractiveModal headerText="Join a Room" onClose={handleClose} showModal={showModal}>
        <>
          <Text>Already know the id for the room you want to join?</Text>
          <Text>Enter it here to get playing faster!</Text>
          <JoinRoomForm onJoinSuccess={handleJoinedRoom} socket={socket} />
        </>
      </InteractiveModal>
    </Box>
  );
};
