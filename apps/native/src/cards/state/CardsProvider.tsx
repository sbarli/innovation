import { createContext, PropsWithChildren, useContext } from 'react';

import { Card, useGetAllCardsQuery } from '@inno/gql';

type TCardsContext = {
  cards: Card[];
  cardsLoading: boolean;
};
const CardsContext = createContext<TCardsContext>({} as TCardsContext);

export const CardsProvider = ({ children }: PropsWithChildren) => {
  const { data, loading } = useGetAllCardsQuery();
  return (
    <CardsContext.Provider
      value={{
        cards: data?.getAllCards ?? [],
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
