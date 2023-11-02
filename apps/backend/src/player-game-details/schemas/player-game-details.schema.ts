import { Field, ID, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ResourceTotals } from 'src/cards/schemas/resource-totals.schema';

import { Board } from './board.schema';

export type PlayerGameDetailsDocument = HydratedDocument<PlayerGameDetails>;

@Schema({ timestamps: true })
@ObjectType()
export class PlayerGameDetails {
  @Field(() => ID)
  _id!: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Game' })
  @Field(() => ID)
  gameRef!: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  @Field(() => ID)
  playerRef!: string;

  @Prop({ required: true })
  @Field(() => Number)
  age!: number;

  @Prop({ required: true })
  @Field(() => Number)
  score!: number;

  @Prop({ required: true, type: ResourceTotals })
  @Field(() => ResourceTotals)
  resourceTotals!: ResourceTotals;

  @Prop({ required: true, type: Board })
  @Field(() => Board)
  board!: Board;

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  achievements!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  hand!: string[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  scoreCardRefs!: string[];

  // TODO: add once we have special achievement data
  // @Prop({
  //   required: true,
  //   type: [MongooseSchema.Types.ObjectId],
  //   ref: 'Card',
  // })
  // @Field(() => [ID])
  // specialAchievements: string[];
}

@InputType()
export class CreatePlayerGameDetailsInput extends OmitType(
  PlayerGameDetails,
  ['_id', 'createdAt', 'updatedAt'] as const,
  InputType
) {}

export const PlayerGameDetailsSchema = SchemaFactory.createForClass(PlayerGameDetails);
