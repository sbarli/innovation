import { useCallback, useEffect, useState } from 'react';

import { ApolloError } from '@apollo/client';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CloseIcon,
  HStack,
  Text,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import { router } from 'expo-router';

import { SocketEvent, SocketEventError } from '@inno/constants';
import { RoomDataFragment } from '@inno/gql';

import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { CustomToast } from '../../app-core/components/toasts/CustomToast';
import { Routes } from '../../app-core/constants/navigation';
import { FormError } from '../../app-core/forms/FormError';
import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useSocketContext } from '../../websockets/SocketProvider';

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

  const [showModal, setShowModal] = useState(false);
  const [leaveRoomError, setLeaveRoomError] = useState('');
  const [usersInRoom, setUsersInRoom] = useState(0);

  useEffect(() => {
    socket?.on(
      SocketEvent.USER_JOINED_ROOM,
      ({ username, usersInRoom }: { username: string; usersInRoom: number }) => {
        refetchRoomData();
        setUsersInRoom(usersInRoom);
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
    socket?.on(SocketEvent.USER_LEFT_ROOM, ({ username }: { username: string }) => {
      if (username !== user?.username) {
        toast.show({
          placement: 'top',
          render: ({ id }) => (
            <CustomToast
              id={id}
              title="User Left Room"
              description={`${username} has left the room`}
            />
          ),
        });
      }
    });
    socket?.on(SocketEvent.LEAVE_ROOM_SUCCESS, () => {
      setLeaveRoomError('');
      router.push(Routes.ROOMS);
    });
    socket?.on(SocketEvent.LEAVE_ROOM_ERROR, (error: SocketEventError) => {
      setLeaveRoomError(error.message);
    });
    return () => {
      socket?.removeListener(SocketEvent.LEAVE_ROOM_ERROR);
      socket?.removeListener(SocketEvent.LEAVE_ROOM_SUCCESS);
      socket?.removeListener(SocketEvent.USER_LEFT_ROOM);
      socket?.removeListener(SocketEvent.USER_JOINED_ROOM);
    };
  }, [socket]);

  const handleLeavePress = () => {
    setShowModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleConfirmLeaveRoom = async () => {
    socket?.emit(SocketEvent.LEAVE_ROOM, { roomId: roomData?._id });
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
          <Text>Welcome to the {roomData.name} room!</Text>
          <Text>There are currently {usersInRoom} players in the room.</Text>
          <Text>There are {roomData.playerRefs.length + 1} players currently allowed in room.</Text>
        </Box>
      </VStack>
      <InteractiveModal
        headerText="Are you sure you want to leave the room?"
        onClose={handleCloseModal}
        showModal={showModal}
        onConfirm={handleConfirmLeaveRoom}
        confirmText="Confirm Leave Room"
      >
        <Text>If you are the host, this will end the game for everyone.</Text>
        <Text>
          If you are a player, this will remove you from the game and everyone else will continue to
          play.
        </Text>
        {leaveRoomError ? <FormError errorMsg={leaveRoomError} /> : null}
      </InteractiveModal>
    </>
  );
};
