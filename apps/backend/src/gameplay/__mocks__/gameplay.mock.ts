import { MOCK_GAME } from 'src/games/__mocks__/game.mock';
import { MOCK_PLAYER_GAME_DETAILS } from 'src/player-game-details/__mocks__/player-game-details.mock';
import { MOCK_EMPTY_SCORE_CARD_REFS } from 'src/player-game-details/__mocks__/score.mock';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';

import { CreateNewGameInput } from '../dto/create-new-game.input.dto';
import { CreateNewGameResponse } from '../dto/create-new-game.output.dto';

export const MOCK_PLAYER_REF_1 = 'mock-player-ref-1';
export const MOCK_PLAYER_REF_2 = 'mock-player-ref-2';

export const MOCK_NEW_GAME_INPUT: CreateNewGameInput = {
  playerRefs: [MOCK_PLAYER_REF_1, MOCK_PLAYER_REF_2],
};

const MOCK_START_GAME_DETAIL_OVERRIDES = {
  gameRef: MOCK_GAME._id ?? 'game-ref-fallback',
  score: 0,
  scoreCardRefs: MOCK_EMPTY_SCORE_CARD_REFS,
};

const MOCK_PLAYER_1_DETAILS: PlayerGameDetails = {
  ...MOCK_PLAYER_GAME_DETAILS,
  ...MOCK_START_GAME_DETAIL_OVERRIDES,
  playerRef: MOCK_PLAYER_REF_1,
};

const MOCK_PLAYER_2_DETAILS: PlayerGameDetails = {
  ...MOCK_PLAYER_GAME_DETAILS,
  ...MOCK_START_GAME_DETAIL_OVERRIDES,
  playerRef: MOCK_PLAYER_REF_2,
};

export const MOCK_NEW_GAME_RESPONSE: CreateNewGameResponse = {
  game: {
    ...MOCK_GAME,
    playerRefs: MOCK_NEW_GAME_INPUT.playerRefs,
    currentPlayerRef: MOCK_PLAYER_REF_1,
  },
  playerGameDetails: [MOCK_PLAYER_1_DETAILS, MOCK_PLAYER_2_DETAILS],
};
