import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('UpdatePlayerOrActionNumberDto')
export class UpdatePlayerOrActionNumberDto {
  @Field(() => Number)
  currentActionNumber: number;

  @Field(() => String)
  currentPlayerRef: string;
}

@ObjectType()
@InputType('UpdateGame2Dto')
export class UpdateGame2Dto extends UpdatePlayerOrActionNumberDto {
  @Field(() => ID)
  gameId: string;
}
