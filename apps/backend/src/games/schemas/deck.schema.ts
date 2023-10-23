import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { AgeString } from 'src/shared/constants/cards';

@Schema({ _id: false })
@ObjectType()
@InputType('DeckDto')
export class Deck {
  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.ONE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.TWO]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.THREE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.FOUR]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.FIVE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.SIX]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.SEVEN]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.EIGHT]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.NINE]!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  [AgeString.TEN]!: string[];
}
