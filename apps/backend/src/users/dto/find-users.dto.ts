import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { FindUsersFieldOptions } from '../users.types';

@ObjectType()
@InputType()
export class FindUsersInput {
  @Field(() => String)
  searchField!: FindUsersFieldOptions;

  @Field(() => [String])
  searchValues!: string[];
}
