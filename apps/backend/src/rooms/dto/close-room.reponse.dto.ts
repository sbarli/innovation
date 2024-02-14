import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CloseRoomResponse {
  @Field(() => Boolean)
  success!: boolean;
}
