import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

import { GameFragment, PlayerGameDetailsFragment, useGetGameDataLazyQuery } from '@inno/gql';

import {
  AgeAchievements,
  Deck,
  GameStatus,
  Players,
  SpecialAchievements,
} from '../../app-core/types/game.types';
import { useCardsContext } from '../../cards/state/CardsProvider';
import { formatAgeAchievementsMetadata } from '../helpers/formatAgeAchievementsMetadata';
import { formatDeckMetadata } from '../helpers/formatDeckMetadata';
import { formatGameMetadata } from '../helpers/formatGameMetadata';
import { formatPlayers } from '../helpers/formatPlayers';
import { formatSpecialAchievementsMetadata } from '../helpers/formatSpecialAchievementsMetadata';
// import { useSocketContext } from '../../websockets/SocketProvider';

// TODO: add default state here
type TGameContext = {
  ageAchievements?: AgeAchievements;
  deck?: Deck;
  fetchGameData: (gameId: string) => void;
  loadingGameData: boolean;
  metadata?: GameStatus;
  players?: Players;
  specialAchievements?: SpecialAchievements;
};
const GameContext = createContext<TGameContext>({} as TGameContext);

// Provider component to wrap around App
export const GameProvider = ({ children }: PropsWithChildren) => {
  const [getGameDataQuery, { loading: fetchingGameData }] = useGetGameDataLazyQuery();
  const { cards } = useCardsContext();
  // const { socket } = useSocketContext();
  const [ageAchievements, setAgeAchievements] = useState<AgeAchievements>();
  const [deck, setDeck] = useState<Deck>();
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<GameStatus>();
  const [players, setPlayers] = useState<Players>();
  const [specialAchievements, setSpecialAchievements] = useState<SpecialAchievements>();

  const handleError = (err?: unknown) => {
    console.log('err: ', err ? JSON.stringify(err, null, 2) : 'unknown error');

    setLoading(false);
  };

  const handleFetchedGameData = ({
    gameData,
    playerDetails,
  }: {
    gameData: GameFragment;
    playerDetails: PlayerGameDetailsFragment[];
  }) => {
    if (gameData) {
      setMetadata(formatGameMetadata({ rawGameData: gameData }));
    }
    if (playerDetails?.length && gameData?.ageAchievements) {
      setAgeAchievements(
        formatAgeAchievementsMetadata({
          gameAgeAchievemnts: gameData.ageAchievements,
          playersGameData: playerDetails,
        })
      );
    }
    if (gameData?.deck) {
      setDeck(formatDeckMetadata(gameData.deck));
    }
    if (playerDetails?.length) {
      setSpecialAchievements(formatSpecialAchievementsMetadata(playerDetails));
    }
    if (playerDetails?.length && cards && gameData?.deck) {
      setPlayers(
        formatPlayers({
          cards,
          deck: gameData?.deck,
          playersGameData: playerDetails,
        })
      );
    }
    setLoading(false);
  };

  const fetchGameData = useCallback(async (gameId: string) => {
    console.log(`useGameData: fetchGameData: fetching for ${gameId}`);
    await getGameDataQuery({
      variables: {
        gameId,
      },
      fetchPolicy: 'no-cache',
      onCompleted(data) {
        setLoading(true);
        if (!data?.getGame || !data?.getDetailsByGame?.length) {
          handleError({
            success: false,
            msg: 'game data not returned from gql query',
          });
          return;
        }
        handleFetchedGameData({ gameData: data.getGame, playerDetails: data.getDetailsByGame });
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(e: any) {
        console.log('caught error running getGameData e: ', e);
        handleError({
          success: false,
          msg: 'error occured running gql query',
        });
      },
    });
  }, []);

  // useEffect(() => {
  //   socket?.on(SocketEvent.GAME_UPDATED, (resp: SocketEventResponse) => {
  //     console.log('GAME_UPDATED event caught -> resp: ', JSON.stringify(resp, null, 2));
  //     if (!resp.success) {
  //       return handleError(resp.error);
  //     }
  //     if (resp.data) {
  //       console.log('received game update notification. updated data: ', resp.data);
  //     }
  //   });

  //   return () => {
  //     socket?.removeListener(SocketEvent.GAME_UPDATED);
  //   };
  // }, [socket]);

  return (
    <GameContext.Provider
      value={{
        ageAchievements,
        deck,
        fetchGameData,
        loadingGameData: loading || fetchingGameData,
        metadata,
        players,
        specialAchievements,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
