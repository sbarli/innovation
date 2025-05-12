import { Field, ID, InputType } from '@nestjs/graphql';

import { Age, DrawType } from '@inno/constants';

@InputType()
export class DrawInput {
  @Field(() => ID)
  gameRef!: string;

  @Field(() => ID)
  playerRef!: string;

  @Field(() => String)
  drawType!: DrawType;

  @Field(() => Boolean)
  countAsAction!: boolean;

  @Field(() => Boolean, { nullable: true })
  ageToDraw?: Age;
}
