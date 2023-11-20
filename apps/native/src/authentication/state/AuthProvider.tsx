import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { ClientUserData, useIsAuthenticatedQuery } from '@inno/gql';

import { StorageKeys } from '../../app-core/constants/storage.constants';
import { TAuthContext, IAuthCallback } from '../auth.types';
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
  const { setItem: setAuthToken, removeItem: clearAuthToken } = useAsyncStorage(
    StorageKeys.AUTH_TOKEN
  );
  const [user, setUser] = useState<ClientUserData>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { loading: isAuthenticatedLoading } = useIsAuthenticatedQuery({
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      if (data?.isAuthenticated?._id) {
        return setIsAuthenticated(true);
      }
      setIsAuthenticated(false);
    },
    onError() {
      clearAuthToken();
      setIsAuthenticated(false);
    },
  });

  const authCallback = useCallback(async ({ authToken, success, user }: IAuthCallback) => {
    if (!success) {
      await clearAuthToken();
      setUser(undefined);
      setIsAuthenticated(false);
      return false;
    }
    if (authToken) {
      await setAuthToken(authToken);
    }
    if (user) {
      setUser(user);
    }
    setIsAuthenticated(true);
    return true;
  }, []);

  const { loading: loginLoading, login } = useLogin(authCallback);
  const { loading: signupLoading, signup } = useSignup(authCallback);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!isAuthenticated,
        isLoading:
          isAuthenticated === null || isAuthenticatedLoading || loginLoading || signupLoading,
        login,
        signup,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
