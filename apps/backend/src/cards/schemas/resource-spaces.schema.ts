import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

import { Resource } from '@inno/constants';

@Schema({ _id: false })
@ObjectType()
export class ResourceSpaces {
  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace1?: Resource | null;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace2?: Resource | null;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace3?: Resource | null;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  resourceSpace4?: Resource | null;
}
