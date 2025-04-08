import { useEffect } from 'react';

import { useAuthContext } from '../state/AuthProvider';

import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';

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
