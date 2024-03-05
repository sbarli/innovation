import { useCallback, useEffect, useMemo, useState } from 'react';

import { ApolloError } from '@apollo/client';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CloseIcon,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import { router } from 'expo-router';

import { IRoomMetadata, SocketEvent, SocketEventError, SocketEventResponse } from '@inno/constants';
import { RoomDataFragment, useCloseRoomMutation } from '@inno/gql';
import { getCatchErrorMessage } from '@inno/utils';

import { CopyableText } from '../../app-core/components/clipboard/CopyableText';
import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { CustomToast } from '../../app-core/components/toasts/CustomToast';
import { Routes } from '../../app-core/constants/navigation';
import { FormError } from '../../app-core/forms/FormError';
import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useSocketContext } from '../../websockets/SocketProvider';
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

  const [closeRoomMutation] = useCloseRoomMutation({
    fetchPolicy: 'no-cache',
  });

  const [showModal, setShowModal] = useState(false);
  const [leaveRoomError, setLeaveRoomError] = useState('');
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
    socket?.on(
      SocketEvent.CLOSE_ROOM_IN_PROGRESS,
      ({ roomId, initiatedBy }: { roomId: string; initiatedBy: string }) => {
        if (initiatedBy !== user?.username && roomId === roomData?._id) {
          toast.show({
            placement: 'top',
            render: ({ id }) => (
              <CustomToast
                id={id}
                title="User Leaving Room"
                description={`${initiatedBy} is leaving the room. Room is being closed. Game is over.`}
              />
            ),
          });
        }
      }
    );
    socket?.on(SocketEvent.CLOSE_ROOM_SUCCESS, () => {
      setLeaveRoomError('');
      router.push(Routes.HOME);
    });
    socket?.on(SocketEvent.CLOSE_ROOM_ERROR, (error: SocketEventError) => {
      setLeaveRoomError(error.message);
    });
    return () => {
      socket?.removeListener(SocketEvent.CLOSE_ROOM_ERROR);
      socket?.removeListener(SocketEvent.CLOSE_ROOM_SUCCESS);
      socket?.removeListener(SocketEvent.CLOSE_ROOM_IN_PROGRESS);
      socket?.removeListener(SocketEvent.USER_JOINED_ROOM);
    };
  }, [socket]);

  const handleLeavePress = () => {
    setShowModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleCloseRoom = async (roomId: string) => {
    await socket?.emit(
      SocketEvent.CLOSE_ROOM,
      { roomId: roomId },
      (response: SocketEventResponse) => {
        if (!response.success) {
          setLeaveRoomError(response.error?.message || 'Error leaving room');
          return;
        }
        setShowModal(false);
        router.push(Routes.HOME);
      }
    );
  };

  const handleConfirmLeaveRoom = async () => {
    if (!roomData?._id) {
      setLeaveRoomError('Error leaving room');
      return;
    }
    closeRoomMutation({
      variables: {
        roomId: roomData._id,
      },
      onCompleted(data) {
        if (!data?.closeRoom.success) {
          setLeaveRoomError('An error occurred. Please try again!');
          return;
        }
        handleCloseRoom(roomData._id);
      },
      onError(error) {
        setLeaveRoomError(getCatchErrorMessage(error, 'An error occurred. Please try again!'));
      },
    });
  };

  const handleStartPress = () => {
    console.log('READY TO START GAME!');
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
    <>
      <VStack px="$6">
        <HStack justifyContent="flex-end">
          <Button onPress={handleLeavePress} variant="outline" action="negative" size="sm">
            <ButtonText>Leave Room </ButtonText>
            <ButtonIcon color="$red600" as={CloseIcon} />
          </Button>
        </HStack>
        <Box alignItems="center">
          <Heading size="lg">Users In Room</Heading>
          {(roomMetadata?.playersInRoom ?? []).map((username) => (
            <Text key={username.replace(' ', '-')}>{username}</Text>
          ))}
        </Box>
        {roomIsOpen ? (
          <Box alignItems="center">
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
                  <HStack alignItems="center">
                    <Text>Invite more players by sharing this room id (click to copy): </Text>
                    <CopyableText text={roomData._id} />
                  </HStack>
                )}
              </>
            )}
          </Box>
        ) : (
          <Box alignItems="center">
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
      <InteractiveModal
        headerText="Are you sure you want to leave the room?"
        onClose={handleCloseModal}
        showModal={showModal}
        onConfirm={handleConfirmLeaveRoom}
        confirmText="Confirm Leave Room"
      >
        <Text>Leaving will end the game for everyone.</Text>
        {leaveRoomError ? <FormError errorMsg={leaveRoomError} /> : null}
      </InteractiveModal>
    </>
  );
};
