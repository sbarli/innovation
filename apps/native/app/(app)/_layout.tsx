import { Text } from '@gluestack-ui/themed';
import { Redirect, Slot } from 'expo-router';

import { Routes } from '../../src/app-core/constants/navigation';
import { useAuthContext } from '../../src/authentication/state/AuthProvider';

// eslint-disable-next-line import/no-default-export
export default function AuthWrapper() {
  const { isAuthenticated, isLoading, logout } = useAuthContext();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading || isAuthenticated === undefined) {
    return <Text>Checking auth status</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (isAuthenticated === false) {
    logout();
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={Routes.AUTH} />;
  }
  return <Slot />;
}
