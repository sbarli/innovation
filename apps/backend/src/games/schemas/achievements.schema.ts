import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
@ObjectType()
@InputType('AchievementsDto')
export class Achievements {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  ONE!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  TWO!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  THREE!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  FOUR!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  FIVE!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  SIX!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  SEVEN!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  EIGHT!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  NINE!: string;
}
