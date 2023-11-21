import { Box, Button, ButtonText, Input, InputField } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { FormError } from '../../app-core/forms/FormError';
import { LoginFormData } from '../auth.types';
import { useAuthContext } from '../state/AuthProvider';
import { loginFormSchema } from '../validation/login-schema';

export const LoginForm = () => {
  const { login, loginError } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };
  return (
    <Box w="$1/2">
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
      <FormError errorMsg={loginError} />
    </Box>
  );
};
