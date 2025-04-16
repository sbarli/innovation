import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Box } from '../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../app-core/components/gluestack/button';
import { HStack } from '../../app-core/components/gluestack/hstack';
import { Input, InputField } from '../../app-core/components/gluestack/input';
import { Text } from '../../app-core/components/gluestack/text';
import { VStack } from '../../app-core/components/gluestack/vstack';
import { FormError } from '../../app-core/forms/FormError';
import { JoinRoomFormData } from '../room.types';

import { joinRoomFormSchema } from './validation/join-room-schema';

export interface IJoinRoomFormProps {
  error?: string;
  loading: boolean;
  onSubmit: (data: JoinRoomFormData) => void;
}

export const JoinRoomForm = ({ error: customError, loading, onSubmit }: IJoinRoomFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<JoinRoomFormData>({
    defaultValues: {
      roomId: '',
    },
    resolver: zodResolver(joinRoomFormSchema),
  });

  return (
    <Box>
      <Box className="mb-5">
        <Controller
          control={control}
          name="roomId"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <VStack space="sm" className="mt-2">
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={!!errors.roomId}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Room ID"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
              <Text size="sm">
                Note: Room ID is different from the room name. Ask host for the ID.
              </Text>
            </VStack>
          )}
        />
        <FormError errorMsg={errors.roomId?.message as string} />
      </Box>
      <FormError errorMsg={customError} />
      <HStack className="justify-end">
        <Button
          onPress={handleSubmit(onSubmit)}
          size="md"
          variant="solid"
          action="positive"
          isDisabled={loading}
          isFocusVisible={false}
        >
          <ButtonText>Join</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};
