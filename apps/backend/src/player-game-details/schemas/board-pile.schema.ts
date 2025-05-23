import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { SplayOption } from '../player-game-details.types';

@Schema({ _id: false })
@ObjectType()
@InputType('BoardPileInput')
export class BoardPile {
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  cardRefs!: string[];

  @Prop({ type: String, nullable: true })
  @Field(() => SplayOption, { nullable: true })
  splayed?: SplayOption;
}
