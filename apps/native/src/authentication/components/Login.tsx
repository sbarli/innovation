import { Link } from 'expo-router';

import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';
import { LoginForm } from '../forms/LoginForm';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export const Login = () => {
  return (
    <Box>
      <Box className="items-center">
        <LoginForm />
      </Box>
      <Box className="flex-row items-center justify-center">
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
