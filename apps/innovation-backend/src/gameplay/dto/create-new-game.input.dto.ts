import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewGameInput {
  @Field(() => [String])
  playerRefs: string[];
}
