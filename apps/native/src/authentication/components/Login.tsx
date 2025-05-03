import { Link } from 'expo-router';

import { Box } from '../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../app-core/components/gluestack/button';
import { Text } from '../../app-core/components/gluestack/text';
import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';
import { LoginForm } from '../forms/LoginForm';

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
            pathname: Routes.AUTH.path,
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
