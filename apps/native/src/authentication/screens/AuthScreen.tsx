import { useLocalSearchParams } from 'expo-router';

import { AuthRouteParams } from '../../app-core/constants/navigation';
import { Login } from '../components/Login';
import { Signup } from '../components/Signup';

import { Box } from '../../app-core/components/gluestack/box';

export const AuthScreen = () => {
  const params = useLocalSearchParams<{ type?: AuthRouteParams }>();

  return <Box>{params.type === AuthRouteParams.SIGNUP ? <Signup /> : <Login />}</Box>;
};
