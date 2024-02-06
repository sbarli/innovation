import { Field, ObjectType } from '@nestjs/graphql';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  access_token!: string;

  @Field(() => UserWithoutPassword)
  user!: UserWithoutPassword;
}
