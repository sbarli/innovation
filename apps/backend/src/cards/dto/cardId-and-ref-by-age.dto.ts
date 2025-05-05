import { Field, ObjectType } from '@nestjs/graphql';

import { Age } from '@inno/constants';

import { CardIdAndRef } from './cardId-and-ref.dto';

@ObjectType()
export class CardIdAndRefByAge {
  @Field(() => [CardIdAndRef])
  [Age.ONE]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.TWO]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.THREE]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.FOUR]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.FIVE]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.SIX]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.SEVEN]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.EIGHT]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.NINE]!: CardIdAndRef[];

  @Field(() => [CardIdAndRef])
  [Age.TEN]!: CardIdAndRef[];
}
