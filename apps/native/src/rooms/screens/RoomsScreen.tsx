import { useEffect } from 'react';

import { Box, FlatList, HStack, Heading, Text, VStack } from '@gluestack-ui/themed';
import { router } from 'expo-router';

import { SocketEvent } from '@inno/constants';
import { Room, RoomDataFragment, useGetRoomsForPlayerQuery } from '@inno/gql';

import { Routes } from '../../app-core/constants/navigation';
import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useSocketContext } from '../../websockets/SocketProvider';
import { CreateRoomCTA } from '../components/CreateRoomCTA';
import { JoinRoomCTA } from '../components/JoinRoomCTA';
import { RoomCard } from '../components/RoomCard';

export const RoomsScreen = () => {
  const { user } = useAuthContext();
  const { data, loading } = useGetRoomsForPlayerQuery();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on(SocketEvent.JOIN_ROOM_SUCCESS, (roomData: Room) => {
      router.push({
        pathname: Routes.ROOM,
        params: { roomId: roomData._id },
      });
    });
    return () => {
      socket?.removeListener(SocketEvent.JOIN_ROOM_SUCCESS);
    };
  }, [socket]);

  if ((!data && loading) || !user) {
    return <Text>Loading Rooms</Text>;
  }

  return (
    <VStack space="xl">
      <HStack px="$5" space="xl" justifyContent="flex-end">
        <CreateRoomCTA socket={socket} />
        <JoinRoomCTA socket={socket} />
      </HStack>
      {data?.getRoomsForPlayer?.length ? (
        <Box>
          <Heading mx="$5" size="lg">
            Your Rooms
          </Heading>
          <FlatList
            mx="$2.5"
            my="$5"
            data={data.getRoomsForPlayer}
            horizontal
            keyExtractor={(item) => (item as RoomDataFragment)._id}
            renderItem={({ item }) => {
              const room = item as RoomDataFragment;
              const userIsHost = room.hostRef === user._id;
              return <RoomCard room={room} metadata={{ userIsHost }} socket={socket} />;
            }}
          />
        </Box>
      ) : (
        <Box alignItems="center">
          <Heading size="lg">You have no rooms</Heading>
          <Text>Create one now!</Text>
        </Box>
      )}
    </VStack>
  );
};
