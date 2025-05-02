import { Field, ID, InputType } from '@nestjs/graphql';

import { MeldType } from '@inno/constants';

@InputType()
export class MeldInput {
  @Field(() => ID)
  gameRef!: string;

  @Field(() => ID)
  playerRef!: string;

  @Field(() => ID)
  cardRef!: string;

  @Field(() => String)
  meldType!: MeldType;

  @Field(() => Boolean)
  isStarterMeld!: boolean;
}
