import { useEffect } from 'react';

import { Box, Text, useToast } from '@gluestack-ui/themed';

import { SocketEvent } from '@inno/constants';

import { CustomToast } from '../../app-core/components/toasts/CustomToast';
import { useSocketContext } from '../../websockets/SocketProvider';

export const RoomScreen = () => {
  const { socket } = useSocketContext();
  const toast = useToast();
  useEffect(() => {
    socket?.on(SocketEvent.USER_JOINED_ROOM, ({ clientId }: { clientId: string }) => {
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
    return () => {
      socket?.removeListener(SocketEvent.USER_JOINED_ROOM);
    };
  }, [socket]);
  return (
    <Box alignItems="center">
      <Text>Welcome to the Game!</Text>
    </Box>
  );
};
