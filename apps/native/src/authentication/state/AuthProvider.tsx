import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { UserWithoutPassword, useIsAuthenticatedQuery } from '@inno/gql';

import { StorageKeys } from '../../app-core/constants/storage.constants';
import { useSocketContext } from '../../websockets/SocketProvider';
import { TAuthContext, IAuthCallback } from '../auth.types';
import { getGraphQLErrorMessage } from '../helpers/get-graphql-error-message';
import { useLogin } from '../hooks/useLogin';
import { useSignup } from '../hooks/useSIgnup';

const AuthContext = createContext<TAuthContext | null>(null);

// This hook can be used to access the user info.
export function useAuthContext() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuthContext must be wrapped in a <AuthProvider />');
  }
  return value;
}

export function AuthProvider(props: PropsWithChildren) {
  const { connectUserToSocket, disconnectUserFromSocket } = useSocketContext();
  const { setItem: setAuthToken, removeItem: clearAuthToken } = useAsyncStorage(
    StorageKeys.AUTH_TOKEN
  );
  const { setItem: setRefreshToken, removeItem: clearRefreshToken } = useAsyncStorage(
    StorageKeys.REFRESH_TOKEN
  );
  const [user, setUser] = useState<UserWithoutPassword>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { loading: isAuthenticatedLoading } = useIsAuthenticatedQuery({
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      if (data?.isAuthenticated?._id) {
        setIsAuthenticated(true);
        setUser(data.isAuthenticated);
        return true;
      }
      logout();
    },
    onError() {
      logout();
    },
  });

  const logout = useCallback(async () => {
    await clearAuthToken();
    await clearRefreshToken();
    setUser(undefined);
    setIsAuthenticated(false);
    disconnectUserFromSocket();
  }, []);

  const authCallback = useCallback(
    async ({ authToken, refreshToken, success, user }: IAuthCallback) => {
      if (!success) {
        await logout();
        return false;
      }
      if (authToken) {
        await setAuthToken(authToken);
        connectUserToSocket(authToken, true);
      }
      if (refreshToken) {
        await setRefreshToken(refreshToken);
      }
      if (user) {
        setUser(user);
      }
      setIsAuthenticated(true);
      return true;
    },
    []
  );

  const { error: loginError, loading: loginLoading, login } = useLogin(authCallback);
  const { error: signupError, loading: signupLoading, signup } = useSignup(authCallback);

  const signupErrorMessage = signupError ? getGraphQLErrorMessage(signupError) : undefined;
  const loginErrorMessage = loginError ? getGraphQLErrorMessage(loginError) : undefined;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!isAuthenticated,
        isLoading:
          isAuthenticated === null || isAuthenticatedLoading || loginLoading || signupLoading,
        login,
        loginError: loginErrorMessage,
        signup,
        signupError: signupErrorMessage,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
