import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CardIdAndRef {
  @Field(() => String)
  cardId: string;

  @Field(() => ID)
  ref: string;
}
