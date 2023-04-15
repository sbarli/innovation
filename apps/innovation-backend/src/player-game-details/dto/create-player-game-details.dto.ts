import { ResourceTotals } from 'src/shared/schemas/resource-totals.schema';
import { Board } from '../schemas/player-game-details.schema';

export class CreatePlayerGameDetailsDto {
  readonly age: number;
  readonly score: number;
  readonly resourceTotals: ResourceTotals;
  readonly board: Board;
  readonly achievements: string[];
  readonly hand: string[];
  readonly scoreCardRefs: string[];
  // TODO: add once we have spec achiev data
  // readonly specialAchievements: string[];
}
