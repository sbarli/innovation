import { ClientUserData, CreateUserInput, GetUserInput } from '@inno/gql';

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  displayName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type TAuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginData: GetUserInput) => void;
  signup: (signupData: CreateUserInput) => void;
  user?: ClientUserData;
};

export interface IAuthCallback {
  authToken?: string;
  success: boolean;
  user?: ClientUserData;
}

export type AuthCallbackFn = ({ authToken, success, user }: IAuthCallback) => Promise<boolean>;
