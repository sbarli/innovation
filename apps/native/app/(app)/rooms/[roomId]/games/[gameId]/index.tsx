import { useLocalSearchParams } from 'expo-router';

import { useGetGameQuery } from '@inno/gql';

import { HeaderNoNav } from '../../../../../../src/app-core/components/headers/HeaderNoNav';
import { GameScreen } from '../../../../../../src/games/screens/GameScreen';

// eslint-disable-next-line import/no-default-export
export default function Game() {
  const { gameId } = useLocalSearchParams();
  const { data } = useGetGameQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      gameId: (gameId as string) ?? '',
    },
    skip: !gameId || typeof gameId !== 'string',
  });
  return (
    <>
      <HeaderNoNav title="Game Start" />
      <GameScreen gameData={data?.getGame} />
    </>
  );
}
