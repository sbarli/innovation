import { GAME, CARDS, PLAYER_ONE, PLAYER_TWO } from '@inno/mocks';

import { HeaderWithBackNavigation } from '../../../src/app-core/components/headers/HeaderWithBackNavigation';
import { Routes } from '../../../src/app-core/constants/navigation';
import { GameTrainingScreen } from '../../../src/training/GameTrainingScreen';

// eslint-disable-next-line import/no-default-export
export default function GameTraining() {
  return (
    <>
      <HeaderWithBackNavigation title={Routes.TRAINING_GAME.name} />
      <GameTrainingScreen
        cards={CARDS}
        game={GAME}
        gameDetailsByPlayer={[PLAYER_ONE, PLAYER_TWO]}
      />
    </>
  );
}
