import { Age } from '@inno/constants';

import { AgeAchievements } from '../schemas/age-achievements.schema';

export const MOCK_STARTER_AGE_ACHIEVEMENTS: AgeAchievements = {
  [Age.ONE]: '6435a7d5dd31b5790f7bc58a',
  [Age.TWO]: '6435a7d5dd31b5790f7bc59b',
  [Age.THREE]: '6435a7d5dd31b5790f7bc5a4',
  [Age.FOUR]: '6435a7d5dd31b5790f7bc5ad',
  [Age.FIVE]: '6435a7d5dd31b5790f7bc5bb',
  [Age.SIX]: '6435a7d5dd31b5790f7bc5bf',
  [Age.SEVEN]: '6435a7d5dd31b5790f7bc5ce',
  [Age.EIGHT]: '6435a7d5dd31b5790f7bc5d3',
  [Age.NINE]: '6435a7d5dd31b5790f7bc5e4',
};

export const MOCK_PLAYER_AGE_ACHIEVEMENT_CARD_REF = 'mock-achievement-card-ref';

export const MOCK_EMPTY_PLAYER_AGE_ACHIEVEMENTS = [];
export const MOCK_PLAYER_AGE_ACHIEVEMENTS = [MOCK_PLAYER_AGE_ACHIEVEMENT_CARD_REF];
