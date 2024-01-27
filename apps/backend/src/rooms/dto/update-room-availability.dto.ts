import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRoomAvailabilityInput {
  @Field(() => String)
  roomId!: string;

  @Field(() => Boolean)
  availableToJoin!: boolean;
}
