import { GAME, CARDS, PLAYER_ONE, PLAYER_TWO } from '@inno/mocks';

import { HeaderWithBackNavigation } from '../../../src/app-core/components/headers/HeaderWithBackNavigation';
import { GameTrainingScreen } from '../../../src/training/GameTrainingScreen';

// eslint-disable-next-line import/no-default-export
export default function GameTraining() {
  return (
    <>
      <HeaderWithBackNavigation title="Game Training" />
      <GameTrainingScreen
        cards={CARDS}
        game={GAME}
        gameDetailsByPlayer={[PLAYER_ONE, PLAYER_TWO]}
      />
    </>
  );
}
