import { GameFragment } from '@inno/gql';

import { GameStatus } from '../../app-core/types/game.types';

export const formatGameMetadata = ({ rawGameData }: { rawGameData: GameFragment }): GameStatus => {
  return {
    currentActionNumber: rawGameData.currentActionNumber,
    currentPlayerId: rawGameData.currentPlayerRef,
    stage: rawGameData.stage,
    winnerId: rawGameData.winnerRef ?? null,
  } as GameStatus; // NOTE: casting required bc typing is weird with GQL
};
