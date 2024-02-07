import { User, UserWithoutPassword } from 'src/users/schemas/user.schema';

export const transformUserToClientUser = (
  user: User | UserWithoutPassword
): UserWithoutPassword => ({
  _id: user._id,
  username: user.username,
  email: user.email,
});
