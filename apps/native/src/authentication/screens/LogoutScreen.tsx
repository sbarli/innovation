import { useEffect } from 'react';

import { Center } from '../../app-core/components/gluestack/center';
import { Text } from '../../app-core/components/gluestack/text';
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
