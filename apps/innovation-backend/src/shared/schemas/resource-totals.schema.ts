import { Prop, Schema } from '@nestjs/mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@Schema({ _id: false })
@ObjectType()
@InputType('ResourceTotalsDto')
export class ResourceTotals {
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
