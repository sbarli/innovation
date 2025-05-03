import { Redirect, Slot } from 'expo-router';

import { Text } from '../../src/app-core/components/gluestack/text';
import { Routes } from '../../src/app-core/constants/navigation';
import { text } from '../../src/app-core/intl/en';
import { useAuthContext } from '../../src/authentication/state/AuthProvider';
import { CardsProvider } from '../../src/cards/state/CardsProvider';
import { RoomProvider } from '../../src/rooms/state/RoomProvider';

// eslint-disable-next-line import/no-default-export
export default function AuthWrapper() {
  const { isAuthenticated, isLoading, logout } = useAuthContext();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading || isAuthenticated === undefined) {
    return <Text>{text.auth.CHECKING_AUTH_STATUS}</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (isAuthenticated === false) {
    logout();
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={Routes.AUTH.path} />;
  }
  return (
    <CardsProvider>
      <RoomProvider>
        <Slot />
      </RoomProvider>
    </CardsProvider>
  );
}
