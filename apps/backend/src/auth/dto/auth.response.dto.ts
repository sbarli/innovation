import { Field, ObjectType } from '@nestjs/graphql';
import { ClientUserData } from 'src/users/schemas/user.schema';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  access_token!: string;

  @Field(() => ClientUserData)
  user!: ClientUserData;
}
