import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class GetUserInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
