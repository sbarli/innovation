import { Field, ID, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { DogmaEffect } from './dogma-effect.schema';
import { ResourceSpaces } from './resource-spaces.schema';
import { ResourceTotals } from './resource-totals.schema';

export type CardDocument = HydratedDocument<Card>;

@Schema()
@ObjectType()
export class Card {
  @Field(() => ID)
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

  @Prop({ type: String, required: true })
  @Field(() => String)
  color!: string;

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

@InputType()
export class CreateCardInput extends OmitType(Card, ['_id'] as const, InputType) {}

export const CardSchema = SchemaFactory.createForClass(Card);
