import { IValidateGameUpdatesResponse } from '../helpers/validate-game-updates';

export const MOCK_VALIDATION_ERROR_MESSAGE = 'mock validation error';

export const MOCK_GAME_UPDATE_VALIDATION_PASS = {
  hasErrors: false,
  errors: [],
};

export const MOCK_GAME_UPDATE_VALIDATION_ERROR: IValidateGameUpdatesResponse = {
  hasErrors: true,
  errors: [MOCK_VALIDATION_ERROR_MESSAGE],
};
