import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Achievements } from '../schemas/achievements.schema';
import { Deck } from '../schemas/deck.schema';

@ObjectType()
@InputType()
export class UpdateGameInput {
  @Field(() => Number, { nullable: true })
  currentActionNumber?: number;

  @Field(() => String, { nullable: true })
  currentPlayerRef?: string;

  @Field(() => String, { nullable: true })
  winnerRef?: string;

  @Field(() => Deck, { nullable: true })
  deck?: Deck;

  @Field(() => Achievements, { nullable: true })
  achievements?: Achievements;
}
