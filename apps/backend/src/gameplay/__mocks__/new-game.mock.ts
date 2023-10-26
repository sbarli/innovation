import { MOCK_STARTER_ACHIEVEMENTS } from 'src/games/__mocks__/achievements.mock';
import { MOCK_DECK } from 'src/games/__mocks__/deck.mock';
import { MOCK_PLAYER_REF_1, MOCK_PLAYER_REF_2 } from 'src/players/__mocks__/player.mock';

import { TPlayerStarterHands } from '../helpers/new-game';
import { TNewGameSetup } from '../services/new-game.service';

const MOCK_CARD_REF = 'mock-card-ref';

export const MOCK_PLAYER_STARTER_HANDS: TPlayerStarterHands = {
  [MOCK_PLAYER_REF_1]: [MOCK_CARD_REF, MOCK_CARD_REF],
  [MOCK_PLAYER_REF_2]: [MOCK_CARD_REF, MOCK_CARD_REF],
};

export const MOCK_NEW_GAME_SETUP: TNewGameSetup = {
  deck: MOCK_DECK,
  achievements: MOCK_STARTER_ACHIEVEMENTS,
  playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
};
