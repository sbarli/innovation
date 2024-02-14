import { router } from 'expo-router';

import { CreateUserInput, useSignupMutation } from '@inno/gql';

import { Routes } from '../../app-core/constants/navigation';
import { AuthCallbackFn } from '../auth.types';

export const useSignup = (authCallback: AuthCallbackFn) => {
  const [signupMutation, { loading, error }] = useSignupMutation();

  const signup = async (signupData: CreateUserInput) => {
    signupMutation({
      variables: {
        newUserData: signupData,
      },
      fetchPolicy: 'no-cache',
      onCompleted(data) {
        if (data?.signup?.authToken && data?.signup?.user && data?.signup?.refreshToken) {
          authCallback({
            authToken: data?.signup?.authToken,
            refreshToken: data?.signup?.refreshToken,
            success: true,
            user: data?.signup?.user,
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
    signup,
  };
};
