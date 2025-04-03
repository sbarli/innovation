import { Field, ID, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { ActionNumber, GameStage } from '@inno/constants';

import { AgeAchievements } from './age-achievements.schema';
import { Deck } from './deck.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema({ timestamps: true })
@ObjectType()
export class Game {
  @Field(() => ID)
  _id!: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Room', unique: true })
  @Field(() => ID)
  roomRef!: string;

  @Prop({ type: Number, required: true })
  @Field(() => Number)
  currentActionNumber!: ActionNumber;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  currentPlayerRef!: string;

  @Prop({ required: true, type: String })
  @Field(() => String)
  stage!: GameStage;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  @Field(() => [ID])
  playerRefs!: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    nullable: true,
  })
  @Field(() => ID, { nullable: true })
  winnerRef?: string;

  @Prop({ required: true, type: Deck })
  @Field(() => Deck)
  deck!: Deck;

  @Prop({ required: true, type: AgeAchievements })
  @Field(() => AgeAchievements)
  ageAchievements!: AgeAchievements;
}

@InputType()
export class CreateGameInput extends OmitType(
  Game,
  ['_id', 'createdAt', 'updatedAt', 'winnerRef'] as const,
  InputType
) {}

export const GameSchema = SchemaFactory.createForClass(Game);
