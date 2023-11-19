import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

import { AuthRouteParams, Routes } from '../../app-core/constants/navigation';

export const SignupForm = () => {
  return (
    <Box>
      <Text> Signup Form Goes Here</Text>
      <Link
        href={{
          pathname: Routes.AUTH,
          params: {
            type: AuthRouteParams.LOGIN,
          },
        }}
        asChild
      >
        <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false}>
          <ButtonText>Login</ButtonText>
        </Button>
      </Link>
    </Box>
  );
};
