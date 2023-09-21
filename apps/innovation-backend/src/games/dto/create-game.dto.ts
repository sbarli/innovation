import { Achievements } from '../schemas/achievements.schema';
import { Deck } from '../schemas/deck.schema';

export class CreateGameDto {
  readonly currentActionNumber: number;
  readonly currentPlayerRef: string;
  readonly playerRefs: string[];
  readonly deck: Deck;
  readonly achievements: Achievements;
}
