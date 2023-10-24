import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Achievements } from './achievements.schema';
import { Deck } from './deck.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
@ObjectType()
@InputType('CreateGameDto')
export class Game {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Prop({ type: Number, required: true })
  @Field(() => Number)
  currentActionNumber!: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
  @Field(() => ID)
  currentPlayerRef!: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Player',
  })
  @Field(() => [ID])
  playerRefs!: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    nullable: true,
  })
  @Field(() => ID, { nullable: true })
  winnerRef?: string;

  @Prop({ required: true, type: Deck })
  @Field(() => Deck)
  deck!: Deck;

  @Prop({ required: true, type: Achievements })
  @Field(() => Achievements)
  achievements!: Achievements;

  // TODO: add once we have spec achieve data
  // @Prop({ required: true, type: SpecialAchievements })
  // specialAchievements: SpecialAchievements;
}

export const GameSchema = SchemaFactory.createForClass(Game);
