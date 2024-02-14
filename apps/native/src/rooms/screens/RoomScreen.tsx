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

import { IRoomMetadata, SocketEvent, SocketEventError, SocketEventResponse } from '@inno/constants';
import { RoomDataFragment, useCloseRoomMutation } from '@inno/gql';
import { getCatchErrorMessage } from '@inno/utils';

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

  const [closeRoomMutation] = useCloseRoomMutation({
    fetchPolicy: 'no-cache',
  });

  const [showModal, setShowModal] = useState(false);
  const [leaveRoomError, setLeaveRoomError] = useState('');
  const [usersInRoom, setUsersInRoom] = useState(0);

  useEffect(() => {
    socket?.on(
      SocketEvent.USER_JOINED_ROOM,
      ({ username, metadata }: { username: string; metadata: IRoomMetadata }) => {
        refetchRoomData();
        setUsersInRoom(metadata.playersInRoom);
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
