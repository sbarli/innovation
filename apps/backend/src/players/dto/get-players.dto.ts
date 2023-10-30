import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { GetPlayerFieldOptions } from '../players.types';

@ObjectType()
@InputType()
export class GetPlayersInput {
  @Field(() => String)
  searchField!: GetPlayerFieldOptions;

  @Field(() => [String])
  searchValues!: string[];
}
