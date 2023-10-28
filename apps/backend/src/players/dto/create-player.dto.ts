import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class CreatePlayerInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  playerId!: string;
}
