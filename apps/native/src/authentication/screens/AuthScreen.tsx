import { Box, Heading, Text } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useIsAuthenticatedQuery } from '@inno/gql';

import { AuthRouteParams } from '../../app-core/constants/navigation';
import { Login } from '../components/Login';
import { SignupForm } from '../components/SignupForm';

export const AuthScreen = () => {
  const params = useLocalSearchParams<{ type?: AuthRouteParams }>();
  const { data, loading } = useIsAuthenticatedQuery();
  if (loading) {
    return (
      <Box>
        <Text>Checking auth status...</Text>
      </Box>
    );
  }

  if (!data?.isAuthenticated._id) {
    return <Box>{params.type === AuthRouteParams.SIGNUP ? <SignupForm /> : <Login />}</Box>;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Box alignItems="center">
        <Heading size="lg">User Is Authenticated</Heading>
      </Box>
    </>
  );
};
