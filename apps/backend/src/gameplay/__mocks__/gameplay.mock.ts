import { MOCK_GAME } from 'src/games/__mocks__/game.mock';
import { MOCK_PLAYER_GAME_DETAILS } from 'src/player-game-details/__mocks__/player-game-details.mock';
import { MOCK_EMPTY_SCORE_CARD_REFS } from 'src/player-game-details/__mocks__/score.mock';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';
import { MOCK_ROOM_ID } from 'src/rooms/__mocks__/room.mock';
import { MOCK_USER_ID, MOCK_USER_ID_2 } from 'src/users/__mocks__/user.mock';

import { CreateNewGameInput } from '../dto/create-new-game.input.dto';
import { CreateNewGameResponse } from '../dto/create-new-game.output.dto';
import { MeldInput } from '../dto/meld.input.dto';
import { IMeldCardfromHandResponse } from '../services/player-actions.service';

export const MOCK_PLAYER_REFS = [MOCK_USER_ID, MOCK_USER_ID_2];

export const MOCK_NEW_GAME_INPUT: CreateNewGameInput = {
  roomRef: MOCK_ROOM_ID,
  playerRefs: MOCK_PLAYER_REFS,
};

const MOCK_START_GAME_DETAIL_OVERRIDES = {
  gameRef: MOCK_GAME._id,
  score: 0,
  scoreCardRefs: MOCK_EMPTY_SCORE_CARD_REFS,
};

export const MOCK_PLAYER_1_DETAILS: PlayerGameDetails = {
  ...MOCK_PLAYER_GAME_DETAILS,
  ...MOCK_START_GAME_DETAIL_OVERRIDES,
  playerRef: MOCK_USER_ID,
};

export const MOCK_PLAYER_2_DETAILS: PlayerGameDetails = {
  ...MOCK_PLAYER_GAME_DETAILS,
  ...MOCK_START_GAME_DETAIL_OVERRIDES,
  playerRef: MOCK_USER_ID_2,
};

export const MOCK_NEW_GAME_RESPONSE: CreateNewGameResponse = {
  gameId: MOCK_GAME._id,
};

export const MOCK_MELD_FROM_HAND_INPUT: MeldInput = {
  cardRef: MOCK_PLAYER_GAME_DETAILS.hand[0],
  gameRef: MOCK_GAME._id,
  countAsAction: false,
  isStarterMeld: false,
  playerRef: MOCK_PLAYER_GAME_DETAILS.playerRef,
  meldType: 'fromHand',
};

export const MOCK_MELD_FROM_HAND_RESPONSE: IMeldCardfromHandResponse = {
  updatedPlayerHand: MOCK_PLAYER_GAME_DETAILS.hand.slice(1),
  updatedPlayerBoard: MOCK_PLAYER_GAME_DETAILS.board,
};
