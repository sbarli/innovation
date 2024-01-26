import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
@ObjectType()
export class Room {
  @Field(() => ID)
  _id!: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Prop({ required: true, type: String })
  @Field(() => String)
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  hostRef?: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  @Field(() => [ID])
  connectedPlayerRefs!: string[];

  @Prop({ required: true, default: true, type: Boolean })
  @Field(() => Boolean)
  availableToJoin!: boolean;
}

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  roomName!: string;
}

export type NullishRoom = Room | null | undefined;

export const RoomSchema = SchemaFactory.createForClass(Room);
