import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateNewGameResponse {
  @Field(() => ID)
  gameId!: string;
}
