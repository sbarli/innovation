import { Box, Heading, Text } from '@gluestack-ui/themed';

import { useGetRoomsForPlayerQuery } from '@inno/gql';

import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useSocketContext } from '../../websockets/SocketProvider';
import { CreateRoomCTA } from '../components/CreateRoomCTA';
import { JoinRoomCTA } from '../components/JoinRoomCTA';

export const RoomsScreen = () => {
  const { user } = useAuthContext();
  const { data, loading } = useGetRoomsForPlayerQuery();
  const { socket } = useSocketContext();

  if ((!data && loading) || !user) {
    return <Text>Loading Rooms</Text>;
  }

  return (
    <Box flexDirection="column">
      <Box flexDirection="row" justifyContent="space-evenly">
        <CreateRoomCTA socket={socket} />
        <JoinRoomCTA socket={socket} />
      </Box>
      {data?.getRoomsForPlayer?.length ? (
        <Box>
          <Heading size="lg">Your Rooms</Heading>
          <Box flexDirection="row" justifyContent="space-between">
            {data?.getRoomsForPlayer.map((room) => (
              <Box key={`room-${room._id}`}>
                <Heading>{room.roomName}</Heading>
                <Text>{room.availableToJoin ? 'Open' : 'Closed'}</Text>
                {room.hostRef === user._id ? (
                  <Text color="$green700">You are the host!</Text>
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box alignItems="center">
          <Heading size="lg">You have no rooms</Heading>
          <Text>Create one now!</Text>
        </Box>
      )}
      <Box alignItems="center">
        <Heading size="lg">Open Rooms</Heading>
      </Box>
    </Box>
  );
};
