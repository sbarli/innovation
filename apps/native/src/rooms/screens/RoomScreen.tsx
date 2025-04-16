import { useEffect, useMemo, useState } from 'react';

import { ApolloError } from '@apollo/client';

import { IRoomMetadata, SocketEvent, SocketEventResponse } from '@inno/constants';
import { RoomDataFragment } from '@inno/gql';

import { CopyableText } from '../../app-core/components/clipboard/CopyableText';
import { Box } from '../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../app-core/components/gluestack/button';
import { Heading } from '../../app-core/components/gluestack/heading';
import { HStack } from '../../app-core/components/gluestack/hstack';
import { Text } from '../../app-core/components/gluestack/text';
import { useToast } from '../../app-core/components/gluestack/toast';
import { VStack } from '../../app-core/components/gluestack/vstack';
import { CustomToast } from '../../app-core/components/toasts/CustomToast';
import { FormError } from '../../app-core/forms/FormError';
import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useSocketContext } from '../../websockets/SocketProvider';
import { LeaveRoomCTA } from '../components/LeaveRoomCTA';
import { useStartNewGame } from '../hooks/useStartNewGame';

export interface IRoomScreenProps {
  error?: ApolloError;
  loading: boolean;
  refetchRoomData: () => void;
  roomData?: RoomDataFragment | null;
}

export const RoomScreen = ({ error, loading, refetchRoomData, roomData }: IRoomScreenProps) => {
  const { user } = useAuthContext();
  const { socket } = useSocketContext();
  const toast = useToast();
  const [roomMetadata, setRoomMetadata] = useState<IRoomMetadata>();

  const {
    errorMsg: startGameError,
    loading: startGameLoading,
    handleStartGame,
  } = useStartNewGame({});

  const userIsHost = useMemo(
    () => !!(user?._id && roomData?.hostRef && user._id === roomData.hostRef),
    [user?._id, roomData?.hostRef]
  );

  const allPlayersInLobby = roomData?.playerRefs.length === roomMetadata?.playersInRoom.length;

  const roomIsOpen =
    roomData?.availableToJoin || (!roomData?.availableToJoin && !allPlayersInLobby);

  // get current room metadata on when roomId exists and/or changes
  useEffect(() => {
    if (roomData?._id) {
      socket?.emit(
        SocketEvent.GET_ROOM_METADATA,
        { roomId: roomData?._id },
        ({ success, data }: SocketEventResponse & { data: IRoomMetadata }) => {
          if (success && data?.playersInRoom) {
            setRoomMetadata(data);
          }
        }
      );
    }
  }, [roomData?._id]);

  useEffect(() => {
    socket?.on(
      SocketEvent.USER_JOINED_ROOM,
      ({ username, metadata }: { username: string; metadata: IRoomMetadata }) => {
        refetchRoomData();
        setRoomMetadata(metadata);
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
      }
    );
    return () => {
      socket?.removeListener(SocketEvent.USER_JOINED_ROOM);
    };
  }, [socket]);

  const handleStartPress = () => {
    if (!roomData?._id || !roomData?.playerRefs) {
      return;
    }
    handleStartGame({
      playerRefs: roomData.playerRefs,
      roomRef: roomData._id,
    });
  };

  if (!roomData && loading) {
    return (
      <Box className="items-center">
        <Text>Loading room...</Text>
      </Box>
    );
  }

  if (!roomData || error) {
    console.error('error: ', error);
    return (
      <Box className="items-center">
        <Text>Something went wrong! Go back to rooms and try again</Text>
      </Box>
    );
  }

  return (
    <VStack className="px-6">
      <HStack className="justify-end">
        <LeaveRoomCTA roomId={roomData._id} />
      </HStack>
      <Box className="items-center">
        <Heading size="lg">Users In Room</Heading>
        {(roomMetadata?.playersInRoom ?? []).map((username) => (
          <Text key={username.replace(' ', '-')}>{username}</Text>
        ))}
      </Box>
      {roomIsOpen ? (
        <Box className="items-center">
          <Heading size="lg">Room Open</Heading>
          {userIsHost && (roomMetadata?.playersInRoom ?? []).length > 1 ? (
            <Box>
              <Text>
                More players are still able to join. Are you ready to start the game anyway?
              </Text>
              <Button onPress={handleStartPress} variant="solid" action="positive" size="lg">
                <ButtonText>Start Game</ButtonText>
              </Button>
              {startGameError ? <FormError errorMsg={startGameError} /> : null}
            </Box>
          ) : (
            <>
              <Text>Waiting for more players to join...</Text>
              {userIsHost && !!roomData?._id && (
                <HStack className="items-center">
                  <Text>Invite more players by sharing this room id (click to copy): </Text>
                  <CopyableText text={roomData._id} />
                </HStack>
              )}
            </>
          )}
        </Box>
      ) : (
        <Box className="items-center">
          <Heading size="lg">Room Full</Heading>
          {userIsHost ? (
            <Box>
              <Text>No more users are able to join. Are you ready to start the game?</Text>
              <Button
                onPress={handleStartPress}
                variant="solid"
                action="positive"
                size="lg"
                disabled={startGameLoading}
              >
                <ButtonText>Start Game</ButtonText>
              </Button>
            </Box>
          ) : (
            <Text>Waiting for host to start the game...</Text>
          )}
        </Box>
      )}
    </VStack>
  );
};
