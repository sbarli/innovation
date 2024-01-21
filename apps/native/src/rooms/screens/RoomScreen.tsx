import { useEffect } from 'react';

import { Box, Text, useToast } from '@gluestack-ui/themed';

import { SocketEvent } from '@inno/constants';

import { CustomToast } from '../../app-core/components/toasts/CustomToast';
import { socket } from '../../websockets/socket';

export const RoomScreen = () => {
  const toast = useToast();
  useEffect(() => {
    socket.on(SocketEvent.USER_JOINED_ROOM, ({ clientId }: { clientId: string }) => {
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <CustomToast
            id={id}
            title="User Join Room"
            description={`User ${clientId} has entered the room`}
          />
        ),
      });
    });
  }, [socket]);
  return (
    <Box alignItems="center">
      <Text>Welcome to the Game!</Text>
    </Box>
  );
};
