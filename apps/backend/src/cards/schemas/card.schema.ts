import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

import { ResourceTotals } from './resource-totals.schema';

export type CardDocument = HydratedDocument<Card>;

@Schema({ _id: false })
@ObjectType()
export class ResourceSpaces extends Document {
  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace1!: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace2!: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace3!: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace4!: string;
}

@Schema({ _id: false })
@ObjectType()
export class DogmaEffect extends Document {
  @Prop({ type: String, required: true })
  @Field(() => String)
  description!: string;

  @Prop({ type: [String], required: true })
  @Field(() => [String])
  effectTypes!: string[];

  @Prop({ type: Boolean, required: true })
  @Field(() => Boolean)
  isDemand!: boolean;

  @Prop({ type: Boolean, required: true })
  @Field(() => Boolean)
  isOptional!: boolean;

  @Prop({ type: Boolean, required: true })
  @Field(() => Boolean)
  repeat!: boolean;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  specialAchievement!: string;
}

@Schema()
@ObjectType()
export class Card {
  @Field(() => ID, { nullable: true })
  _id!: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  cardId!: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  name!: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  age!: number;

  @Prop({ type: String, required: true })
  @Field(() => String)
  dogmaResource!: string;

  @Prop({ required: true, type: ResourceTotals })
  @Field(() => ResourceTotals)
  resourceTotals!: ResourceTotals;

  @Prop({ required: true, type: ResourceSpaces })
  @Field(() => ResourceSpaces)
  resourceSpaces!: ResourceSpaces;

  @Prop([DogmaEffect])
  @Field(() => [DogmaEffect])
  dogmaEffects!: DogmaEffect[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
