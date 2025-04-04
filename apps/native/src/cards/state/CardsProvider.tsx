import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { useGetAllCardsQuery } from '@inno/gql';

import { Cards } from '../../app-core/types/game.types';

type TCardsContext = {
  cards?: Cards;
  cardsLoading: boolean;
};
const CardsContext = createContext<TCardsContext>({} as TCardsContext);

export const CardsProvider = ({ children }: PropsWithChildren) => {
  const { data, loading } = useGetAllCardsQuery();

  const cards = useMemo(() => {
    if (!data?.getAllCards?.length) {
      return undefined;
    }
    return (data?.getAllCards ?? []).reduce((acc, card) => {
      acc[card._id] = card;
      return acc;
    }, {} as Cards);
  }, [data]);

  return (
    <CardsContext.Provider
      value={{
        cards,
        cardsLoading: loading,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const useCardsContext = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCardsContext must be used within a CardsProvider');
  }
  return context;
};
