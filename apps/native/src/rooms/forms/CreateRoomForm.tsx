import { Box, Button, ButtonText, HStack, Input, InputField } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { FormError } from '../../app-core/forms/FormError';
import { CreateRoomFormData } from '../room.types';

import { createRoomFormSchema } from './validation/create-room-schema';

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
    <Box mt="$2">
      <Box marginBottom="$5">
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

      <HStack justifyContent="flex-end">
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
      <FormError errorMsg={customError} />
    </Box>
  );
};
