import { useEffect } from 'react';

import { ApolloError } from '@apollo/client';
import { Box, Text, useToast } from '@gluestack-ui/themed';

import { SocketEvent } from '@inno/constants';
import { RoomDataFragment } from '@inno/gql';

import { CustomToast } from '../../app-core/components/toasts/CustomToast';
import { useSocketContext } from '../../websockets/SocketProvider';

export interface IRoomScreenProps {
  error?: ApolloError;
  loading: boolean;
  roomData?: RoomDataFragment | null;
}

export const RoomScreen = ({ error, loading, roomData }: IRoomScreenProps) => {
  const { socket } = useSocketContext();
  const toast = useToast();
  useEffect(() => {
    socket?.on(SocketEvent.USER_JOINED_ROOM, ({ username }: { username: string }) => {
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <CustomToast
            id={id}
            title="User Join Room"
            description={`${username} has entered the room`}
          />
        ),
      });
    });
    return () => {
      socket?.removeListener(SocketEvent.USER_JOINED_ROOM);
    };
  }, [socket]);
  if (!roomData && loading) {
    return (
      <Box alignItems="center">
        <Text>Loading room...</Text>
      </Box>
    );
  }
  if (!roomData || error) {
    console.error('error: ', error);
    return (
      <Box alignItems="center">
        <Text>Something went wrong! Go back to rooms and try again</Text>
      </Box>
    );
  }
  return (
    <Box alignItems="center">
      <Text>Welcome to the {roomData.name} room!</Text>
    </Box>
  );
};
