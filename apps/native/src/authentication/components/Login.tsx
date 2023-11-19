import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';
import { LoginForm } from '../forms/LoginForm';

export const Login = () => {
  return (
    <Box>
      <Box alignItems="center">
        <LoginForm />
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent="center">
        <Text>Don't have an account? </Text>
        <Link
          href={{
            pathname: Routes.AUTH,
            params: {
              type: AuthRouteParams.SIGNUP,
            },
          }}
          asChild
        >
          <Button
            size="md"
            variant="link"
            action="secondary"
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText>Signup</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
