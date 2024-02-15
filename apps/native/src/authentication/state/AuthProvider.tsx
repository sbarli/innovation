import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { UserWithoutPassword, useIsAuthenticatedQuery } from '@inno/gql';

import { Routes } from '../../app-core/constants/navigation';
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
  const {
    getItem: getStorageUser,
    setItem: setStorageUser,
    removeItem: clearStorageUser,
  } = useAsyncStorage(StorageKeys.USER);
  const [user, setUser] = useState<UserWithoutPassword>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();

  const { loading: isAuthenticatedLoading } = useIsAuthenticatedQuery({
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      if (data?.isAuthenticated?._id) {
        setIsAuthenticated(true);
        setStorageUser(JSON.stringify(data?.isAuthenticated));
        setUser(data?.isAuthenticated);
        return true;
      }
      logout();
    },
    onError() {
      logout();
    },
  });

  useEffect(() => {
    const tryToPopulateUserFromStorage = async () => {
      if (!user) {
        const storageUser = await getStorageUser();
        const userData: UserWithoutPassword | undefined = storageUser && JSON.parse(storageUser);
        if (userData) {
          setUser(userData);
        }
      }
    };
    tryToPopulateUserFromStorage();
  }, []);

  const logout = useCallback(async () => {
    await clearAuthToken();
    await clearRefreshToken();
    await clearStorageUser();
    setUser(undefined);
    setIsAuthenticated(undefined);
    disconnectUserFromSocket();
    router.push(Routes.AUTH);
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
        setStorageUser(JSON.stringify(user));
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

  const authLoading = (!isAuthenticated && isAuthenticatedLoading) || loginLoading || signupLoading;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading: authLoading,
        login,
        loginError: loginErrorMessage,
        logout,
        signup,
        signupError: signupErrorMessage,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
