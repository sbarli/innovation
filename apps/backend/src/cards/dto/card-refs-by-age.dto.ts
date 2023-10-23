import { Field, ObjectType } from '@nestjs/graphql';
import { AgeString } from 'src/shared/constants/cards';

@ObjectType()
export class CardRefsByAge {
  @Field(() => [String])
  [AgeString.ONE]!: string[]; // NOTE: need the ! due to this: https://github.com/Microsoft/TypeScript-Vue-Starter/issues/36#issuecomment-371434263

  @Field(() => [String])
  [AgeString.TWO]!: string[];

  @Field(() => [String])
  [AgeString.THREE]!: string[];

  @Field(() => [String])
  [AgeString.FOUR]!: string[];

  @Field(() => [String])
  [AgeString.FIVE]!: string[];

  @Field(() => [String])
  [AgeString.SIX]!: string[];

  @Field(() => [String])
  [AgeString.SEVEN]!: string[];

  @Field(() => [String])
  [AgeString.EIGHT]!: string[];

  @Field(() => [String])
  [AgeString.NINE]!: string[];

  @Field(() => [String])
  [AgeString.TEN]!: string[];
}
