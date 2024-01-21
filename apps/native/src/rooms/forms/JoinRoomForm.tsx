import { useEffect } from 'react';

import { Box, Button, ButtonText, Input, InputField } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { SocketEvent } from '@inno/constants';

import { FormError } from '../../app-core/forms/FormError';
import { socket } from '../../websockets/socket';
import { JoinRoomFormData } from '../room.types';

import { joinRoomFormSchema } from './validation/join-room-schema';

export interface IJoinRoomFormProps {
  onJoinSuccess: (roomId: string) => void;
}

export const JoinRoomForm = ({ onJoinSuccess }: IJoinRoomFormProps) => {
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
    socket.emit(SocketEvent.JOIN_ROOM, data);
  };

  useEffect(() => {
    socket.on(SocketEvent.ALREADY_IN_ROOM, () => {
      setError('roomId', {
        type: 'custom',
        message: 'You are already in this room!',
      });
    });
    socket.on(SocketEvent.ROOM_JOINED, (roomId: string) => {
      onJoinSuccess(roomId);
    });
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
