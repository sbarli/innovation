import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { ActionNumber, GameStage } from '@inno/constants';

import { AgeAchievements } from '../schemas/age-achievements.schema';
import { Deck } from '../schemas/deck.schema';

@ObjectType()
@InputType()
export class UpdateGameInput {
  @Field(() => Number, { nullable: true })
  currentActionNumber?: ActionNumber;

  @Field(() => String, { nullable: true })
  currentPlayerRef?: string;

  @Field(() => String, { nullable: true })
  winnerRef?: string;

  @Field(() => Deck, { nullable: true })
  deck?: Deck;

  @Field(() => AgeAchievements, { nullable: true })
  ageAchievements?: AgeAchievements;

  @Field(() => String, { nullable: true })
  stage?: GameStage;
}
