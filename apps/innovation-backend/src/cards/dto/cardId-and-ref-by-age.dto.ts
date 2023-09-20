import { Field, ObjectType } from '@nestjs/graphql';
import { CardIdAndRef } from './cardId-and-ref.dto';

@ObjectType()
export class CardIdAndRefByAge {
  @Field(() => [CardIdAndRef])
  ONE: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  TWO: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  THREE: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  FOUR: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  FIVE: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  SIX: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  SEVEN: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  EIGHT: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  NINE: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  TEN: CardIdAndRef[];
}
