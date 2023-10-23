import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

import { BoardPile } from './board-pile.schema';

@Schema({ _id: false })
@ObjectType()
@InputType('BoardDto')
export class Board {
  @Prop({ required: true, type: BoardPile })
  @Field(() => BoardPile)
  blue!: BoardPile;

  @Prop({ required: true, type: BoardPile })
  @Field(() => BoardPile)
  green!: BoardPile;

  @Prop({ required: true, type: BoardPile })
  @Field(() => BoardPile)
  purple!: BoardPile;

  @Prop({ required: true, type: BoardPile })
  @Field(() => BoardPile)
  red!: BoardPile;

  @Prop({ required: true, type: BoardPile })
  @Field(() => BoardPile)
  yellow!: BoardPile;
}
