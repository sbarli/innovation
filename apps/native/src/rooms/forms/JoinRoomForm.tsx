import { useEffect } from 'react';

import { Box, Button, ButtonText, Input, InputField } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Socket } from 'socket.io-client';

import { SocketEvent, SocketEventError } from '@inno/constants';

import { FormError } from '../../app-core/forms/FormError';
import { JoinRoomFormData } from '../room.types';

import { joinRoomFormSchema } from './validation/join-room-schema';

export interface IJoinRoomFormProps {
  onJoinSuccess: (roomId: string) => void;
  socket?: Socket;
}

export const JoinRoomForm = ({ onJoinSuccess, socket }: IJoinRoomFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<JoinRoomFormData>({
    defaultValues: {
      roomId: '',
    },
    resolver: zodResolver(joinRoomFormSchema),
  });

  const onSubmit = async (data: JoinRoomFormData) => {
    if (!socket || !socket?.connected) {
      setError('roomId', {
        type: 'custom',
        message: 'Unexpected error occurred. Please refresh and try again!',
      });
    }
    socket?.emit(SocketEvent.JOIN_ROOM, data);
  };

  useEffect(() => {
    socket?.on(SocketEvent.JOIN_ROOM_ERROR, (error: SocketEventError) => {
      setError('roomId', {
        type: 'custom',
        message: error.message,
      });
    });
    socket?.on(SocketEvent.JOIN_ROOM_SUCCESS, (roomId: string) => {
      onJoinSuccess(roomId);
    });

    return () => {
      socket?.removeListener(SocketEvent.JOIN_ROOM_ERROR);
      socket?.removeListener(SocketEvent.JOIN_ROOM_SUCCESS);
    };
  }, [socket]);

  return (
    <Box w="$1/2">
      <Box marginBottom="$5">
        <Controller
          control={control}
          name="roomId"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={!!errors.roomId}
              isReadOnly={false}
            >
              <InputField
                placeholder="Room Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
        />
        <FormError errorMsg={errors.roomId?.message as string} />
      </Box>

      <Button
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="solid"
        action="positive"
        isDisabled={false}
        isFocusVisible={false}
      >
        <ButtonText>Join Room</ButtonText>
      </Button>
      <FormError errorMsg={''} />
    </Box>
  );
};