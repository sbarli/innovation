import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export function useCards() {
  return useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const result = await api.cards.getCards({});
      if (result.status !== 200) throw new Error('Failed to fetch cards');
      return result.body;
    },
    staleTime: Infinity,
  });
}

type CardItem = NonNullable<ReturnType<typeof useCards>['data']>[number];

export function useCardMap(): Record<string, CardItem> {
  const { data: cards } = useCards();
  const map: Record<string, CardItem> = {};
  for (const card of cards ?? []) {
    map[card.cardId] = card;
  }
  return map;
}
