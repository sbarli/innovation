import { UserWithoutPassword } from 'src/users/schemas/user.schema';

export type GqlReq = {
  user: UserWithoutPassword;
};

export type GqlCtx = {
  req: GqlReq;
};
