import { useAuthContext } from '../state/AuthProvider';

import { Button, ButtonText } from '@/components/ui/button';

export const Logout = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const handleLogout = () => {
    // additional logout logic here
    logout();
  };
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Button variant="link" action="default" onPress={handleLogout} size="md">
      <ButtonText>Logout</ButtonText>
    </Button>
  );
};
