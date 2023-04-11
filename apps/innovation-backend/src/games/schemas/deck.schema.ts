import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Card } from 'src/shared/schemas/card.schema';

@Schema({ _id: false })
export class Deck extends Document {
  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  ONE: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  TWO: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  THREE: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  FOUR: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  FIVE: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  SIX: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  SEVEN: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  EIGHT: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  NINE: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  TEN: Card[];
}
