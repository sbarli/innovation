import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { FormError } from '../../app-core/forms/FormError';
import { CreateRoomFormData } from '../room.types';

import { createRoomFormSchema } from './validation/create-room-schema';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';

export interface ICreateRoomFormProps {
  error?: string;
  loading: boolean;
  onSubmit: (newRoomData: CreateRoomFormData) => void;
}

export const CreateRoomForm = ({ error: customError, loading, onSubmit }: ICreateRoomFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateRoomFormData>({
    defaultValues: {
      roomName: '',
    },
    resolver: zodResolver(createRoomFormSchema),
  });

  return (
    <Box className="mt-2">
      <Box className="mb-5">
        <Controller
          control={control}
          name="roomName"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={!!errors.roomName}
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
        <FormError errorMsg={errors.roomName?.message as string} />
      </Box>
      <FormError errorMsg={customError} />
      <HStack className="justify-end">
        <Button
          onPress={handleSubmit(onSubmit)}
          size="md"
          variant="solid"
          action="positive"
          disabled={loading}
          isFocusVisible={false}
        >
          <ButtonText>Create Room</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};
