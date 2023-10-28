import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { ResourceTotals } from 'src/cards/schemas/resource-totals.schema';

import { Board } from '../schemas/board.schema';

@ObjectType()
@InputType()
export class UpdatePlayerGameDetailsInput {
  @Field(() => Number, { nullable: true })
  age?: number;

  @Field(() => Number, { nullable: true })
  score?: number;

  @Field(() => ResourceTotals, { nullable: true })
  resourceTotals?: ResourceTotals;

  @Field(() => Board, { nullable: true })
  board?: Board;

  @Field(() => [ID], { nullable: true })
  achievements?: string[];

  @Field(() => [ID], { nullable: true })
  hand?: string[];

  @Field(() => [ID], { nullable: true })
  scoreCardRefs?: string[];
}
