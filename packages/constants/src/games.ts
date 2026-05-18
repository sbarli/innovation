export enum GameStage {
  SETUP = 'setup',
  ACTIVE = 'active',
  COMPLETE = 'complete',
}

export type ActionNumber = 1 | 2;
export type MeldType = 'fromHand' | 'fromDeck';
export type DrawType = 'highestBoardAge' | 'specificAge';
export type WinnerType = 'highestScore' | 'lowestScore' | 'highestResource' | 'lowestResource';
