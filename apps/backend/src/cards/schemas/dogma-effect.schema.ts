import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
@ObjectType()
export class DogmaEffect {
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
  specialAchievement?: string;
}
