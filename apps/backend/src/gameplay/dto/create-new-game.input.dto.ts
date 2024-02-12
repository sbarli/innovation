import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewGameInput {
  @Field(() => String)
  roomRef!: string;

  @Field(() => [String])
  playerRefs!: string[];
}
