import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { Board } from '../schemas/board.schema';

@ObjectType()
@InputType()
export class UpdatePlayerGameDetailsInput {
  @Field(() => Board, { nullable: true })
  board?: Board;

  @Field(() => [ID], { nullable: true })
  ageAchievements?: string[];

  @Field(() => [ID], { nullable: true })
  specialAchievements?: string[];

  @Field(() => [ID], { nullable: true })
  hand?: string[];

  @Field(() => [ID], { nullable: true })
  scorePile?: string[];
}
