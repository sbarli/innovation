import { Field, ObjectType } from '@nestjs/graphql';
import { AgeString } from 'src/shared/constants/cards';

@ObjectType()
export class CardRefsByAge {
  @Field(() => [String])
  [AgeString.ONE]: string[];

  @Field(() => [String])
  [AgeString.TWO]: string[];

  @Field(() => [String])
  [AgeString.THREE]: string[];

  @Field(() => [String])
  [AgeString.FOUR]: string[];

  @Field(() => [String])
  [AgeString.FIVE]: string[];

  @Field(() => [String])
  [AgeString.SIX]: string[];

  @Field(() => [String])
  [AgeString.SEVEN]: string[];

  @Field(() => [String])
  [AgeString.EIGHT]: string[];

  @Field(() => [String])
  [AgeString.NINE]: string[];

  @Field(() => [String])
  [AgeString.TEN]: string[];
}
