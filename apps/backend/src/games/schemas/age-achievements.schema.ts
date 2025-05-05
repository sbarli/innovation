import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { Age } from '@inno/constants';

@Schema({ _id: false })
@ObjectType()
@InputType('AgeAchievementsInput')
export class AgeAchievements {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.ONE]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.TWO]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.THREE]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.FOUR]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.FIVE]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.SIX]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.SEVEN]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.EIGHT]!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Card',
  })
  @Field(() => ID)
  [Age.NINE]!: string;
}
