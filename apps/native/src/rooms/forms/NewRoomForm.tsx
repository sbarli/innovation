import { useEffect } from 'react';

import { Box, Button, ButtonText, Input, InputField } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Socket } from 'socket.io-client';

import { SocketEvent, SocketEventError, SocketEventErrorCode } from '@inno/constants';

import { Routes } from '../../app-core/constants/navigation';
import { FormError } from '../../app-core/forms/FormError';
import { NewRoomFormData } from '../room.types';

import { newRoomFormSchema } from './validation/new-room-schema';

export interface INewRoomFormProps {
  socket?: Socket;
}

export const NewRoomForm = ({ socket }: INewRoomFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<NewRoomFormData>({
    defaultValues: {
      roomId: '',
    },
    resolver: zodResolver(newRoomFormSchema),
  });

  const onSubmit = async (data: NewRoomFormData) => {
    if (!socket || !socket?.connected) {
      setError('roomId', {
        type: 'custom',
        message: 'Unexpected error occurred. Please refresh and try again!',
      });
    }
    socket?.emit(SocketEvent.CREATE_ROOM, data);
  };

  useEffect(() => {
    socket?.on(SocketEvent.CREATE_ROOM_ERROR, (error: SocketEventError) => {
      if (error.errorCode === SocketEventErrorCode.DUPE) {
        setError('roomId', {
          type: 'unique',
          message: 'Room name already exists! Please use a different name.',
        });
      }
    });
    socket?.on(SocketEvent.JOIN_ROOM_SUCCESS, (roomId: string) => {
      router.push({
        pathname: Routes.ROOM,
        params: { roomId },
      });
    });
    return () => {
      socket?.removeListener(SocketEvent.CREATE_ROOM_ERROR);
      socket?.removeListener(SocketEvent.CREATE_ROOM_SUCCESS);
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
        <ButtonText>Create Room</ButtonText>
      </Button>
      <FormError errorMsg={''} />
    </Box>
  );
};
