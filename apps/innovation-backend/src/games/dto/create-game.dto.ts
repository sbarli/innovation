import { Types } from 'mongoose';
import { Achievements } from '../schemas/achievements.schema';
import { Deck } from '../schemas/deck.schema';

export class CreateGameDto {
  readonly currentActionNumber: number;
  readonly currentPlayerRef: Types.ObjectId;
  readonly playerRefs: Types.ObjectId[];
  readonly deck: Deck;
  readonly achievements: Achievements;
}
