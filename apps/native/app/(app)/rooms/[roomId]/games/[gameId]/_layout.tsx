import { Slot } from 'expo-router';

import { GameProvider } from '../../../../../../src/games/state/GameProvider';

// eslint-disable-next-line import/no-default-export
export default function GameWrapper() {
  return (
    <GameProvider>
      <Slot />
    </GameProvider>
  );
}
