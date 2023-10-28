import { Field, InputType, ObjectType } from '@nestjs/graphql';

export type GetPlayerFieldOptions = 'playerId' | 'ref';

@ObjectType()
@InputType()
export class GetPlayerDto {
  @Field(() => String)
  searchField!: GetPlayerFieldOptions;

  @Field(() => String)
  searchValue!: string;
}
