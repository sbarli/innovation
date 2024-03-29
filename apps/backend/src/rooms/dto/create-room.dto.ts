import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  roomName!: string;
}
