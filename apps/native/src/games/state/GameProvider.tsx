import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

import { GameFragment, PlayerGameDetailsFragment, useGetGameDataLazyQuery } from '@inno/gql';

import {
  AgeAchievements,
  Board,
  Boards,
  Deck,
  GameStatus,
  Hand,
  Hands,
  Player,
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
  boards?: Boards;
  deck?: Deck;
  gameId?: string;
  hands?: Hands;
  fetchGameData: (gameId: string) => void;
  loadingGameData: boolean;
  metadata?: GameStatus;
  players?: Players;
  specialAchievements?: SpecialAchievements;
  updatePlayerGameData: (data: IPlayerGameUpdateProps) => void;
};
const GameContext = createContext<TGameContext>({} as TGameContext);

export interface IPlayerGameUpdateProps {
  updatedPlayerId: string;
  updatedPlayerBoard?: Board;
  updatedPlayerHand?: Hand;
}

// Provider component to wrap around App
export const GameProvider = ({ children }: PropsWithChildren) => {
  const [getGameDataQuery, { loading: fetchingGameData }] = useGetGameDataLazyQuery();
  const { cards } = useCardsContext();
  // const { socket } = useSocketContext();
  const [ageAchievements, setAgeAchievements] = useState<AgeAchievements>();
  const [boards, setBoards] = useState<Boards>();
  const [deck, setDeck] = useState<Deck>();
  const [gameId, setGameId] = useState<string>();
  const [hands, setHands] = useState<Hands>();
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<GameStatus>();
  const [players, setPlayers] = useState<Players>();
  const [specialAchievements, setSpecialAchievements] = useState<SpecialAchievements>();

  const handleError = (err?: unknown) => {
    console.log('err: ', err ? JSON.stringify(err, null, 2) : 'unknown error');

    setLoading(false);
  };

  const updatePlayerGameData = useCallback(
    ({ updatedPlayerId, ...dataToUpdate }: IPlayerGameUpdateProps) => {
      if (dataToUpdate.updatedPlayerBoard) {
        setBoards((prev) => ({
          ...prev,
          [updatedPlayerId]: dataToUpdate.updatedPlayerBoard as Board,
        }));
      }
      if (dataToUpdate.updatedPlayerHand) {
        setHands((prev) => ({
          ...prev,
          [updatedPlayerId]: dataToUpdate.updatedPlayerHand as Hand,
        }));
      }
    },
    []
  );

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
      const allPlayerData = formatPlayers({
        cards,
        deck: gameData?.deck,
        playersGameData: playerDetails,
      });
      const players = allPlayerData.reduce((acc, data) => {
        const dataDupe: Partial<typeof data> = { ...data };
        delete dataDupe.hand;
        delete dataDupe.board;
        acc[data.playerId] = dataDupe as Player;
        return acc;
      }, {} as Players);
      const hands = allPlayerData.reduce((acc, data) => {
        acc[data.playerId] = data.hand;
        return acc;
      }, {} as Hands);
      const boards = allPlayerData.reduce((acc, data) => {
        acc[data.playerId] = data.board;
        return acc;
      }, {} as Boards);
      setHands(hands);
      setBoards(boards);
      setPlayers(players);
    }
    setLoading(false);
  };

  const fetchGameData = useCallback(async (gameId: string) => {
    setGameId(gameId);
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

  // TODO: for some reason this doesn't pop toast as expected. maybe add this later, but for now this is overkill
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
        boards,
        deck,
        gameId,
        hands,
        fetchGameData,
        loadingGameData: loading || fetchingGameData,
        metadata,
        players,
        specialAchievements,
        updatePlayerGameData,
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
