import { Box, Button, ButtonText, Input, InputField } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { FormError } from '../../app-core/forms/FormError';
import { SignupFormData } from '../auth.types';
import { useAuthContext } from '../state/AuthProvider';
import { signupFormSchema } from '../validation/signup-schema';

export const SignupForm = () => {
  const { signup, signupError } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(signupFormSchema),
  });
  const onSubmit = (data: SignupFormData) => {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };
  return (
    <Box w="$1/2">
      <Box marginBottom="$5">
        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={!!errors.username}
              isReadOnly={false}
            >
              <InputField
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
        />
        <FormError errorMsg={errors.username?.message} />
      </Box>

      <Box marginBottom="$5">
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={!!errors.email}
              isReadOnly={false}
            >
              <InputField
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
        />
        <FormError errorMsg={errors.email?.message} />
      </Box>

      <Box marginBottom="$5">
        <Controller
          control={control}
          name="password"
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={!!errors.password}
              isReadOnly={false}
            >
              <InputField
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                type="password"
                value={value}
              />
            </Input>
          )}
        />
        <FormError errorMsg={errors.password?.message} />
      </Box>

      <Box marginBottom="$5">
        <Controller
          control={control}
          name="passwordConfirm"
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={!!errors.passwordConfirm}
              isReadOnly={false}
            >
              <InputField
                placeholder="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                type="password"
                value={value}
              />
            </Input>
          )}
        />
        <FormError errorMsg={errors.passwordConfirm?.message} />
      </Box>

      <Button
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="solid"
        action="positive"
        isDisabled={false}
        isFocusVisible={false}
      >
        <ButtonText>Submit</ButtonText>
      </Button>
      <FormError errorMsg={signupError} />
    </Box>
  );
};
