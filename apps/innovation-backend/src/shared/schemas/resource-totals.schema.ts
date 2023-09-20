import { Prop, Schema } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Schema({ _id: false })
@ObjectType()
export class ResourceTotals extends Document {
  @Prop({ required: true })
  @Field(() => Number)
  castles: number;

  @Prop({ required: true })
  @Field(() => Number)
  crowns: number;

  @Prop({ required: true })
  @Field(() => Number)
  leaves: number;

  @Prop({ required: true })
  @Field(() => Number)
  lightbulbs: number;

  @Prop({ required: true })
  @Field(() => Number)
  factories: number;

  @Prop({ required: true })
  @Field(() => Number)
  timepieces: number;
}
