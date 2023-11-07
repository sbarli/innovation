import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class ValidateUserInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
