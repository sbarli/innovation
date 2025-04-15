import { useEffect } from 'react';

import { useAuthContext } from '../state/AuthProvider';

import { Center } from '../../app-core/components/gluestack/center';
import { Text } from '../../app-core/components/gluestack/text';

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
