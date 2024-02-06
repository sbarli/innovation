import { Field, ID, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
@ObjectType()
export class User {
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
  username!: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  @Field(() => String)
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;
}

@ObjectType()
export class UserWithoutPassword extends OmitType(User, ['password'] as const, ObjectType) {}

export const UserSchema = SchemaFactory.createForClass(User);
