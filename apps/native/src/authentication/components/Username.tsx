import { Text } from '../../app-core/components/gluestack/text';
import { useAuthContext } from '../state/AuthProvider';

export const Username = () => {
  const { user } = useAuthContext();
  if (!user?.username) {
    return null;
  }
  return (
    <Text size="md" className="pl-5 text-textLight-100 dark:text-textDark-300">
      {user.username}
    </Text>
  );
};
