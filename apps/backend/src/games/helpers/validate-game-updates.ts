import { UpdateGameInput } from '../dto/update-game.dto';

export interface IValidateGameUpdatesResponse {
  hasErrors: boolean;
  errors: string[];
}

export const validateGameUpdates = (updates: UpdateGameInput): IValidateGameUpdatesResponse => {
  const result: IValidateGameUpdatesResponse = {
    hasErrors: false,
    errors: [],
  };
  if (
    !updates.ageAchievements &&
    !updates.currentActionNumber &&
    !updates.currentPlayerRef &&
    !updates.deck &&
    !updates.winnerRef
  ) {
    result.hasErrors = true;
    result.errors.push('At least one game update is required');
  }
  return result;
};
