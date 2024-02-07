import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenPayload {
  @Field(() => String)
  refreshToken!: string;
}
