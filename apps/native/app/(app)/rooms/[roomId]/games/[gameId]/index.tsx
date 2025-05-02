import { useEffect } from 'react';

import { Redirect, useLocalSearchParams } from 'expo-router';

import { HeaderNoNav } from '../../../../../../src/app-core/components/headers/HeaderNoNav';
import { Routes } from '../../../../../../src/app-core/constants/navigation';
import { GameScreen } from '../../../../../../src/games/screens/GameScreen';
import { useGameContext } from '../../../../../../src/games/state/GameProvider';

// eslint-disable-next-line import/no-default-export
export default function Game() {
  const { gameId } = useLocalSearchParams();
  const { setGameId } = useGameContext();

  useEffect(() => {
    if (!!gameId && typeof gameId === 'string') {
      setGameId(gameId);
    }
  }, [gameId]);

  if (!gameId || typeof gameId !== 'string') {
    return <Redirect href={Routes.HOME} />;
  }

  return (
    <>
      <HeaderNoNav title="Game Start" />
      <GameScreen />
    </>
  );
}
