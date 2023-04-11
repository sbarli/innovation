import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Card } from 'src/shared/schemas/card.schema';

@Schema({ _id: false })
export class Achievements extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  ONE: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  TWO: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  THREE: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  FOUR: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  FIVE: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  SIX: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  SEVEN: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  EIGHT: Card;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  NINE: Card;
}
