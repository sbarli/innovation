import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Deck } from 'src/games/schemas/deck.schema';
import { Board } from 'src/player-game-details/schemas/board.schema';

@ObjectType()
export class MeldResponseMetadata {
  @Field(() => [ID])
  updatedPlayerHand?: string[];

  @Field(() => Deck)
  updatedDeck?: Deck;

  @Field(() => Boolean)
  gameStageUpdated?: boolean;

  @Field(() => Boolean)
  currentActionUpdated?: boolean;
}

@ObjectType()
export class MeldResponse {
  @Field(() => ID)
  gameId!: string;

  @Field(() => ID)
  playerId!: string;

  @Field(() => Board)
  updatedPlayerBoard!: Board;

  @Field(() => MeldResponseMetadata)
  metadata!: MeldResponseMetadata;
}
