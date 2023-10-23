import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

import { Resource } from '../constants/cards';

@Schema({ _id: false })
@ObjectType()
@InputType('ResourceTotalsDto')
export class ResourceTotals {
  @Prop({ required: true })
  @Field(() => Number)
  [Resource.CASTLES]: number;

  @Prop({ required: true })
  @Field(() => Number)
  [Resource.CROWNS]: number;

  @Prop({ required: true })
  @Field(() => Number)
  [Resource.LEAVES]: number;

  @Prop({ required: true })
  @Field(() => Number)
  [Resource.LIGHTBULBS]: number;

  @Prop({ required: true })
  @Field(() => Number)
  [Resource.FACTORIES]: number;

  @Prop({ required: true })
  @Field(() => Number)
  [Resource.TIMEPIECES]: number;
}
