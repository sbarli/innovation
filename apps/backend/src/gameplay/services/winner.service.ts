import { Injectable } from '@nestjs/common';
import type { FullGameState } from '../../games/games.service';

const ACHIEVEMENT_WIN_THRESHOLD = 6;

@Injectable()
export class WinnerService {
  checkAchievementWin(state: FullGameState): string | null {
    for (const pd of state.playerDetails) {
      if (pd.ageAchievements.length >= ACHIEVEMENT_WIN_THRESHOLD) {
        return pd.playerId;
      }
    }
    return null;
  }

  checkScoreWin(state: FullGameState): string | null {
    let winnerId: string | null = null;
    let highestScore = -1;

    for (const pd of state.playerDetails) {
      if (pd.scorePile.length > highestScore) {
        highestScore = pd.scorePile.length;
        winnerId = pd.playerId;
      }
    }
    return winnerId;
  }
}
