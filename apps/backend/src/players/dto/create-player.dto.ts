import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('CreatePlayerDto')
export class CreatePlayerDto {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  playerId!: string;
}
