import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ResourceTotals } from 'src/shared/schemas/resource-totals.schema';

export type CardDocument = HydratedDocument<Card>;

@Schema({ _id: false })
@ObjectType()
export class ResourceSpaces extends Document {
  @Prop({ nullable: true })
  @Field({ nullable: true })
  resourceSpace1: string;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  resourceSpace2: string;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  resourceSpace3: string;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  resourceSpace4: string;
}

@Schema({ _id: false })
@ObjectType()
export class DogmaEffect extends Document {
  @Prop({ required: true })
  @Field(() => String)
  description: string;

  @Prop({ type: [String] })
  @Field(() => [String])
  effectTypes: string[];

  @Prop({ required: true })
  @Field(() => Boolean)
  isDemand: boolean;

  @Prop({ required: true })
  @Field(() => Boolean)
  isOptional: boolean;

  @Prop({ required: true })
  @Field(() => Boolean)
  repeat: boolean;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  specialAchievement: string;
}

@Schema()
@ObjectType()
export class Card {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field(() => String)
  cardId: string;

  @Prop({ required: true })
  @Field(() => String)
  name: string;

  @Prop({ required: true })
  @Field(() => String)
  age: number;

  @Prop({ required: true })
  @Field(() => String)
  dogmaResource: string;

  @Prop({ required: true, type: ResourceTotals })
  @Field(() => ResourceTotals)
  resourceTotals: ResourceTotals;

  @Prop({ required: true, type: ResourceSpaces })
  @Field(() => ResourceSpaces)
  resourceSpaces: ResourceSpaces;

  @Prop([DogmaEffect])
  @Field(() => [DogmaEffect])
  dogmaEffects: DogmaEffect[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
