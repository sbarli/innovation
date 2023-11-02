import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ timestamps: true })
@ObjectType()
export class Player {
  @Field(() => ID)
  _id!: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Prop({ type: String, required: true })
  @Field(() => String)
  name!: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  playerId!: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
