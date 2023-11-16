import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtPayload {
  @Field(() => ID)
  sub!: string;
}
