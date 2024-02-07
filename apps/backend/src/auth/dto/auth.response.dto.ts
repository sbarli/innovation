import { Field, ObjectType } from '@nestjs/graphql';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  authToken!: string;

  @Field(() => String)
  refreshToken!: string;

  @Field(() => UserWithoutPassword)
  user!: UserWithoutPassword;
}
