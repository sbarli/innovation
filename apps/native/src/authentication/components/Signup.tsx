import { Link } from 'expo-router';

import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';
import { SignupForm } from '../forms/SignupForm';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export const Signup = () => {
  return (
    <Box>
      <Box className="items-center">
        <SignupForm />
      </Box>
      <Box className="flex-row items-center justify-center">
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
