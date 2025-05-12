import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { GameFragment, PlayerGameDetailsFragment, useGetGameDataQuery } from '@inno/gql';

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

type TGameContext = {
  ageAchievements?: AgeAchievements;
  boards?: Boards;
  deck?: Deck;
  gameId?: string;
  hands?: Hands;
  haveNecessaryGameData: boolean;
  loadingGameData: boolean;
  metadata?: GameStatus;
  players?: Players;
  setGameId: (id: string) => void;
  specialAchievements?: SpecialAchievements;
};

// TODO: add default state here
const GameContext = createContext<TGameContext>({} as TGameContext);

export interface IHandleFetchedGameDataProps {
  gameData: GameFragment;
  playerDetails: PlayerGameDetailsFragment[];
}

export interface IPlayerGameUpdateProps {
  updatedPlayerId: string;
  updatedPlayerBoard?: Board;
  updatedPlayerHand?: Hand;
}

// Provider component to wrap around App
export const GameProvider = ({ children }: PropsWithChildren) => {
  const { cards } = useCardsContext();
  const [gameId, setGameId] = useState<string>();

  // error, refetch, startPolling, stopPolling
  const { data, loading } = useGetGameDataQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      gameId: (gameId as string) ?? '',
    },
    skip: !gameId || typeof gameId !== 'string',
    pollInterval: 1000,
  });

  const metadata = useMemo(() => {
    if (!data?.getGame) {
      return;
    }
    return formatGameMetadata({ rawGameData: data?.getGame });
  }, [data?.getGame]);

  const ageAchievements = useMemo(() => {
    if (!data?.getDetailsByGame?.length || !data?.getGame?.ageAchievements) {
      return;
    }
    return formatAgeAchievementsMetadata({
      gameAgeAchievemnts: data.getGame.ageAchievements,
      playersGameData: data.getDetailsByGame,
    });
  }, [data?.getDetailsByGame, data?.getGame?.ageAchievements]);

  const deck = useMemo(() => {
    if (!data?.getGame?.deck) {
      return;
    }
    return formatDeckMetadata(data.getGame.deck);
  }, [data?.getGame?.deck]);

  const specialAchievements = useMemo(() => {
    if (!data?.getDetailsByGame) {
      return;
    }
    return formatSpecialAchievementsMetadata(data.getDetailsByGame);
  }, [data?.getDetailsByGame]);

  const { players, hands, boards } = useMemo(() => {
    if (!data?.getDetailsByGame?.length || !data?.getGame?.deck || !cards) {
      return {};
    }
    const allPlayerData = formatPlayers({
      ageAchievementData: ageAchievements,
      cards,
      playersGameData: data.getDetailsByGame,
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
    return { players, hands, boards };
  }, [ageAchievements, cards, data?.getDetailsByGame]);

  const haveNecessaryGameData = useMemo(() => {
    if (
      !gameId ||
      !ageAchievements ||
      !specialAchievements ||
      !metadata ||
      !players ||
      !hands ||
      !boards ||
      !deck
    ) {
      return false;
    }
    return true;
  }, [gameId, ageAchievements, specialAchievements, metadata, players, hands, boards, deck]);

  return (
    <GameContext.Provider
      value={{
        ageAchievements,
        boards,
        deck,
        gameId,
        hands,
        haveNecessaryGameData,
        loadingGameData: loading,
        metadata,
        players,
        setGameId,
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
