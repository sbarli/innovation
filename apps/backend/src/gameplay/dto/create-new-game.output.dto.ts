import { Field, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/schemas/game.schema';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';

@ObjectType()
export class CreateNewGameResponse {
  @Field(() => Game)
  game: Game;

  @Field(() => [PlayerGameDetails])
  playerGameDetails: PlayerGameDetails[];
}
