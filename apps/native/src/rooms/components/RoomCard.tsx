import {
  Badge,
  BadgeIcon,
  Box,
  Button,
  ButtonText,
  CheckCircleIcon,
  CloseCircleIcon,
  Divider,
  HStack,
  Heading,
  StarIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Socket } from 'socket.io-client';

import { IRoomMetadata, SocketEvent } from '@inno/constants';
import { RoomDataFragment } from '@inno/gql';

export interface IExtendedRoomMetadata extends IRoomMetadata {
  userIsHost: boolean;
}

export interface IRoomCardProps {
  metadata: IExtendedRoomMetadata;
  room: RoomDataFragment;
  socket?: Socket;
}

export const RoomCard = ({ metadata, room, socket }: IRoomCardProps) => {
  const handleJoinPress = () => {
    socket?.emit(SocketEvent.JOIN_ROOM, { roomId: room._id });
  };

  return (
    <Box
      borderWidth="$1"
      borderColor="$borderLight500"
      borderRadius="$md"
      pt="$2.5"
      pb="$4"
      px="$4"
      mx="$2.5"
    >
      <HStack space="xl" justifyContent="space-between">
        <Heading>{room.name}</Heading>
        <HStack space="xs">
          {room.availableToJoin ? (
            <Badge size="md" variant="solid" borderRadius="$full" action="success">
              <BadgeIcon as={CheckCircleIcon} />
            </Badge>
          ) : (
            <Badge size="md" variant="solid" borderRadius="$full" action="muted">
              <BadgeIcon as={CloseCircleIcon} />
            </Badge>
          )}
          {metadata.userIsHost ? (
            <Badge size="md" variant="solid" borderRadius="$full" action="info">
              <BadgeIcon as={StarIcon} />
            </Badge>
          ) : null}
        </HStack>
      </HStack>
      <Divider mt="$2" mb="$4" />
      <VStack space="lg">
        {metadata.userIsHost ? <Text>Room ID: {room._id}</Text> : null}
        {/* TODO: make this host username */}
        <Text>Host: {room.hostRef}</Text>
        {metadata.playersInRoom !== undefined ? (
          <Text>Players in room: {metadata.playersInRoom}</Text>
        ) : null}
        <HStack space="md" justifyContent="flex-end">
          {metadata.userIsHost ? (
            // TODO: add close room logic
            // eslint-disable-next-line prettier/prettier
            <Button variant="outline" action="negative" onPress={() => { }}>
              <ButtonText>Close</ButtonText>
            </Button>
          ) : null}
          {room.availableToJoin ? (
            <Button action="positive" onPress={handleJoinPress}>
              <ButtonText>Join</ButtonText>
            </Button>
          ) : null}
        </HStack>
      </VStack>
    </Box>
  );
};
