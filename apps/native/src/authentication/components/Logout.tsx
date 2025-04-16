import { Button, ButtonText } from '../../app-core/components/gluestack/button';
import { useAuthContext } from '../state/AuthProvider';

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
