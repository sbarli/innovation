import { Link } from 'expo-router';

import { Box } from '../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../app-core/components/gluestack/button';
import { Text } from '../../app-core/components/gluestack/text';
import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';
import { SignupForm } from '../forms/SignupForm';

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
            pathname: Routes.AUTH.path,
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
