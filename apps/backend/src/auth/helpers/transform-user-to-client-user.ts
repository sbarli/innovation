import { ClientUserData, User, UserWithoutPassword } from 'src/users/schemas/user.schema';

export const transformUserToClientUser = (user: User | UserWithoutPassword): ClientUserData => ({
  _id: user._id,
  username: user.username,
  email: user.email,
});
