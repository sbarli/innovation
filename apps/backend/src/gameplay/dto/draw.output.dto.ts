import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Age } from '@inno/constants';

import { Deck } from 'src/games/schemas/deck.schema';

@ObjectType()
export class DrawResponseMetadata {
  @Field(() => [ID], { nullable: true })
  updatedPlayerHand?: string[];

  @Field(() => Deck, { nullable: true })
  updatedDeck?: Deck;

  @Field(() => Boolean)
  gameStageUpdated!: boolean;

  @Field(() => Boolean)
  currentActionUpdated!: boolean;
}

@ObjectType()
export class DrawResponse {
  @Field(() => ID)
  gameId!: string;

  @Field(() => ID)
  playerId!: string;

  @Field(() => String, { nullable: true })
  ageDrawn?: Age;

  @Field(() => DrawResponseMetadata)
  metadata!: DrawResponseMetadata;
}
