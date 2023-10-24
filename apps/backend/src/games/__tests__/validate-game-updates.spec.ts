import { MOCK_GAME_UPDATE_VALIDATION_PASS } from '../__mocks__/game-validation-error.mock';
import { MOCK_PLAYER_1_ID } from '../__mocks__/game.mock';
import { validateGameUpdates } from '../helpers/validate-game-updates';

describe('validateGameUpdates', () => {
  it('should return error(s) when input is invalid', () => {
    const output = validateGameUpdates({});
    expect(output.hasErrors).toBe(true);
    expect(output.errors.length).toBe(1);
  });
  it('should return no errors when input is valid', () => {
    const output = validateGameUpdates({ winnerRef: MOCK_PLAYER_1_ID });
    expect(output).toEqual(MOCK_GAME_UPDATE_VALIDATION_PASS);
  });
});
