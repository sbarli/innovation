import { Field, InputType, ObjectType } from '@nestjs/graphql';

export type FindOneByFieldOptions = 'cardId' | 'ref';

@ObjectType()
@InputType('FindOneOptionsInput')
export class FindOneOptionsInput {
  @Field(() => String)
  searchField!: FindOneByFieldOptions;

  @Field(() => String)
  searchValue!: string;
}
