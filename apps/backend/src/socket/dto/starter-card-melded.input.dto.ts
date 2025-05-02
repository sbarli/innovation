import { Board } from 'src/player-game-details/schemas/board.schema';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';

export interface IStarterCardMeldedUpdatedData {
  updatedPlayerId: string;
  updatedPlayerBoard?: Board;
  updatedPlayerHand?: Pick<PlayerGameDetails, 'hand'>;
}
