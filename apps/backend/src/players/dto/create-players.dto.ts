import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class CreatePlayersInput {
  @Field(() => [String])
  names!: string[];
}
