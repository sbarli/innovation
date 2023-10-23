import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
@ObjectType()
export class Player {
  @Field(() => ID)
  _id!: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  name!: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  playerId!: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
