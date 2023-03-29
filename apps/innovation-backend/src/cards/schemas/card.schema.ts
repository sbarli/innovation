import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

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

@Schema({ _id: false })
export class ResourceSpaces extends Document {
  @Prop()
  resourceSpace1: string;

  @Prop()
  resourceSpace2: string;

  @Prop()
  resourceSpace3: string;

  @Prop()
  resourceSpace4: string;
}

@Schema({ _id: false })
export class DogmaEffect extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ type: [String] })
  effectTypes: string[];

  @Prop({ required: true })
  isDemand: boolean;

  @Prop({ required: true })
  isOptional: boolean;

  @Prop({ required: true })
  repeat: boolean;

  @Prop()
  specialAchievement: string;
}

@Schema()
export class Card {
  @Prop({ required: true })
  cardId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  dogmaResource: string;

  @Prop({ required: true, type: ResourceTotals })
  resourceTotals: ResourceTotals;

  @Prop({ required: true, type: ResourceSpaces })
  resourceSpaces: ResourceSpaces;

  @Prop([DogmaEffect])
  dogmaEffects: DogmaEffect[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
