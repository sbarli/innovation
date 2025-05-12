export enum GameStage {
  SETUP = 'setup',
  ACTIVE = 'active',
  COMPLETE = 'complete',
}

export type ActionNumber = 1 | 2;

export type MeldType = 'fromHand' | 'fromDeck';

/**
 * NOTE: always subject to availability in deck. if no cards in deck for expected draw age, next highest avaiable age will be drawn.
 * 'highestBoardAge' = draw based on highest age on top of player's board (or 1, if no cards on board)
 * 'specificAge' = draw based on a specific age
 */
export type DrawType = 'highestBoardAge' | 'specificAge';

/**
 * 'highestScore' = player with current highest score wins
 * 'lowestScore' = player with current lowest score wins
 * 'highestResource' = player with most amount of specified resource type wins
 * 'lowestResource' = player with least amount of specified resource type wins
 */
export type WinnerType = 'highestScore' | 'lowestScore' | 'highestResource' | 'lowestResource';
