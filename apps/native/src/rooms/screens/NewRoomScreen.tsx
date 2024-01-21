import { useEffect } from 'react';

import { Box } from '@gluestack-ui/themed';
import { router } from 'expo-router';

import { SocketEvent } from '@inno/constants';

import { Routes } from '../../app-core/constants/navigation';
import { socket } from '../../websockets/socket';
import { NewRoomForm } from '../forms/NewRoomForm';

export const NewRoomScreen = () => {
  useEffect(() => {
    socket.on(SocketEvent.ROOM_JOINED, (roomId: string) => {
      router.push({
        pathname: Routes.ROOM,
        params: { roomId },
      });
    });
  }, [socket]);
  return (
    <Box alignItems="center">
      <NewRoomForm />
    </Box>
  );
};
