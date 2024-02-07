import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenPayload {
  @Field(() => String)
  authToken!: string;
}
