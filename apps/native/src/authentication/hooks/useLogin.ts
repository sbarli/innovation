import { router } from 'expo-router';

import { GetUserInput, useLoginLazyQuery } from '@inno/gql';

import { Routes } from '../../app-core/constants/navigation';
import { AuthCallbackFn } from '../auth.types';

export const useLogin = (authCallback: AuthCallbackFn) => {
  const [loginQuery, { loading, error }] = useLoginLazyQuery();

  const login = async (loginData: GetUserInput) => {
    await loginQuery({
      variables: {
        loginUserInput: loginData,
      },
      fetchPolicy: 'no-cache',
      onCompleted(data) {
        if (data.login?.access_token && data.login?.user) {
          authCallback({
            authToken: data.login?.access_token,
            success: true,
            user: data.login?.user,
          }).then(() => {
            router.replace(Routes.HOME);
          });
        } else {
          authCallback({
            success: false,
          });
        }
      },
      onError() {
        authCallback({
          success: false,
        });
      },
    });
  };

  return {
    error,
    loading,
    login,
  };
};
