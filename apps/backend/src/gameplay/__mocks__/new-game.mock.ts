import { MOCK_STARTER_AGE_ACHIEVEMENTS } from 'src/games/__mocks__/age-achievements.mock';
import { MOCK_DECK } from 'src/games/__mocks__/deck.mock';
import { MOCK_USER_ID, MOCK_USER_ID_2 } from 'src/users/__mocks__/user.mock';

import { TPlayerStarterHands } from '../helpers/new-game';
import { TNewGameSetup } from '../services/new-game.service';

const MOCK_CARD_REF = 'mock-card-ref';

export const MOCK_PLAYER_STARTER_HANDS: TPlayerStarterHands = {
  [MOCK_USER_ID]: [MOCK_CARD_REF, MOCK_CARD_REF],
  [MOCK_USER_ID_2]: [MOCK_CARD_REF, MOCK_CARD_REF],
};

export const MOCK_NEW_GAME_SETUP: TNewGameSetup = {
  deck: MOCK_DECK,
  ageAchievements: MOCK_STARTER_AGE_ACHIEVEMENTS,
  playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
};
