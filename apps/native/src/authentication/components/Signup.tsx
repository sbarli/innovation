import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';
import { SignupForm } from '../forms/SignupForm';

export const Signup = () => {
  return (
    <Box>
      <Box alignItems="center">
        <SignupForm />
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent="center">
        <Text>Already have an account? </Text>
        <Link
          href={{
            pathname: Routes.AUTH,
            params: {
              type: AuthRouteParams.LOGIN,
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
            <ButtonText>Login</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
