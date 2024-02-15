import { useEffect } from 'react';

import { Center, Text } from '@gluestack-ui/themed';

import { useAuthContext } from '../state/AuthProvider';

export const LogoutScreen = () => {
  const { logout } = useAuthContext();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Center>
      <Text>Logging out...</Text>
    </Center>
  );
};
