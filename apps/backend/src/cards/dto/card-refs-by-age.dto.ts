import { Field, ObjectType } from '@nestjs/graphql';

import { Age } from '@inno/constants';

@ObjectType()
export class CardRefsByAge {
  @Field(() => [String])
  [Age.ONE]!: string[]; // NOTE: need the ! due to this: https://github.com/Microsoft/TypeScript-Vue-Starter/issues/36#issuecomment-371434263

  @Field(() => [String])
  [Age.TWO]!: string[];

  @Field(() => [String])
  [Age.THREE]!: string[];

  @Field(() => [String])
  [Age.FOUR]!: string[];

  @Field(() => [String])
  [Age.FIVE]!: string[];

  @Field(() => [String])
  [Age.SIX]!: string[];

  @Field(() => [String])
  [Age.SEVEN]!: string[];

  @Field(() => [String])
  [Age.EIGHT]!: string[];

  @Field(() => [String])
  [Age.NINE]!: string[];

  @Field(() => [String])
  [Age.TEN]!: string[];
}
