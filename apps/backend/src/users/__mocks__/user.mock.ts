import { CreateUserInput } from '../dto/create-user.dto';
import { GetUserInput } from '../dto/get-user.dto';
import { User, UserWithoutPassword } from '../schemas/user.schema';

export const MOCK_USER_ID = 'mock_user_id';
export const MOCK_USER_ID_2 = 'mock_user_id_2';
export const MOCK_USER_DISPLAY_NAME = 'Mock User Display Name';
export const MOCK_USER_EMAIL = 'mock@useremail.com';
export const MOCK_USER_PASSWORD = 'mock@userpass1';

export const MOCK_CREATE_USER_INPUT: CreateUserInput = {
  email: MOCK_USER_EMAIL,
  password: MOCK_USER_PASSWORD,
  username: MOCK_USER_DISPLAY_NAME,
};

export const MOCK_GET_USER_INPUT: GetUserInput = {
  email: MOCK_USER_EMAIL,
  password: MOCK_USER_PASSWORD,
};

export const MOCK_USER: User = {
  ...MOCK_CREATE_USER_INPUT,
  _id: MOCK_USER_ID,
  createdAt: undefined,
  updatedAt: undefined,
};

export const MOCK_USER_WITHOUT_PASSWORD: UserWithoutPassword = {
  _id: MOCK_USER_ID,
  email: MOCK_USER_EMAIL,
  username: MOCK_USER_DISPLAY_NAME,
  createdAt: undefined,
  updatedAt: undefined,
};

export const MOCK_USER_CLIENT_DATA: UserWithoutPassword = {
  _id: MOCK_USER_ID,
  email: MOCK_USER_EMAIL,
  username: MOCK_USER_DISPLAY_NAME,
};
