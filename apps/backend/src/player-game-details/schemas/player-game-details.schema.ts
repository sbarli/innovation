import { Field, ID, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

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

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  playerRef!: string;

  @Prop({ required: true, type: Board })
  @Field(() => Board)
  board!: Board;

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  @Field(() => [ID])
  ageAchievements!: string[];

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
  scorePile!: string[];

  // TODO: update to ObjectId once we have special achievement data stored in DB
  @Prop({
    required: true,
    type: [String],
  })
  @Field(() => [ID])
  specialAchievements!: string[];

  @Field(() => String, { nullable: true })
  username?: string;
}

@InputType()
export class CreatePlayerGameDetailsInput extends OmitType(
  PlayerGameDetails,
  ['_id', 'createdAt', 'updatedAt'] as const,
  InputType
) {}

export const PlayerGameDetailsSchema = SchemaFactory.createForClass(PlayerGameDetails);
