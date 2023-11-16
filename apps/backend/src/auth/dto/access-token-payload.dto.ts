import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenPayload {
  @Field(() => String)
  access_token!: string;
}
