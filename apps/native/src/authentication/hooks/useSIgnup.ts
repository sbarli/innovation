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
        if (data.signup?.access_token && data.signup?.user) {
          authCallback({
            authToken: data.signup?.access_token,
            success: true,
            user: data.signup?.user,
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
