import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
@ObjectType()
export class ResourceSpaces {
  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace1?: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace2?: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace3?: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace4?: string;
}
