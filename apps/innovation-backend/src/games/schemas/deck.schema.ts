import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AgeString } from 'src/shared/constants/cards';
import { Card } from 'src/shared/schemas/card.schema';

@Schema({ _id: false })
export class Deck extends Document {
  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.ONE]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.TWO]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.THREE]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.FOUR]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.FIVE]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.SIX]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.SEVEN]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.EIGHT]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.NINE]: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  [AgeString.TEN]: Card[];
}
