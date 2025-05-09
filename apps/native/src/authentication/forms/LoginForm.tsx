import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Box } from '../../app-core/components/gluestack/box';
import { Button, ButtonGroup, ButtonText } from '../../app-core/components/gluestack/button';
import { Input, InputField } from '../../app-core/components/gluestack/input';
import { isDev, TESTER_EMAILS, TESTER_PW } from '../../app-core/constants/manifest';
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
    setValue,
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
    <Box className="w-1/2">
      <Box className="mb-5">
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
      <Box className="mb-5">
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
      {isDev ? (
        <ButtonGroup flexDirection="row" space="sm" className="mb-5">
          {TESTER_EMAILS.map((email) => (
            <Button
              key={email}
              onPress={() => {
                setValue('email', email);
                setValue('password', TESTER_PW);
              }}
              size="md"
              variant="outline"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText>{email}</ButtonText>
            </Button>
          ))}
        </ButtonGroup>
      ) : null}
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
