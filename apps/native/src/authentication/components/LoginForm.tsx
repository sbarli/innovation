import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';

export const LoginForm = () => {
  return (
    <Box>
      <Text> Login Form Goes Here</Text>
      <Link
        href={{
          pathname: Routes.AUTH,
          params: {
            type: AuthRouteParams.SIGNUP,
          },
        }}
        asChild
      >
        <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false}>
          <ButtonText>Signup</ButtonText>
        </Button>
      </Link>
    </Box>
  );
};
