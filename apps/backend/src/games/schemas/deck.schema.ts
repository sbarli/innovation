import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { Age } from '@inno/constants';

@Schema({ _id: false })
@ObjectType()
@InputType('DeckInput')
export class Deck {
  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.ONE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.TWO]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.THREE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.FOUR]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.FIVE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.SIX]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.SEVEN]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.EIGHT]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.NINE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [Age.TEN]!: string[];
}
