import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class ResourceTotals extends Document {
  @Prop({ required: true })
  castles: number;

  @Prop({ required: true })
  crowns: number;

  @Prop({ required: true })
  leaves: number;

  @Prop({ required: true })
  lightbulbs: number;

  @Prop({ required: true })
  factories: number;

  @Prop({ required: true })
  timepieces: number;
}
