import { User, UserWithoutPassword } from 'src/users/schemas/user.schema';

export const stripPasswordFromUser = (user: User): UserWithoutPassword => ({
  _id: user._id,
  displayName: user.displayName,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
