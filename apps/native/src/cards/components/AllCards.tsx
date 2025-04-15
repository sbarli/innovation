import { useGetAllCardsQuery } from '@inno/gql';

import { CardFrontWithDetails } from './CardFrontWithDetails';
import { CardBack } from './back/CardBack';

import { Box } from '../../app-core/components/gluestack/box';
import { HStack } from '../../app-core/components/gluestack/hstack';
import { Text } from '../../app-core/components/gluestack/text';

export const AllCards = () => {
  const { data, loading } = useGetAllCardsQuery();
  const allCards = data?.getAllCards;
  if (loading && !allCards?.length) {
    return (
      <Box>
        <Text>Loading</Text>
      </Box>
    );
  }
  return (
    <Box className="w-full px-10 gap-2.5">
      <HStack space="md" className="w-full gap-2.5">
        {allCards?.slice(0, 3).map((c) => <CardFrontWithDetails key={c.cardId} card={c} />)}
      </HStack>
      <HStack space="md" className="w-full gap-2.5">
        {allCards
          ?.slice(allCards.length - 8, allCards.length - 4)
          .map((c) => <CardFrontWithDetails key={c.cardId} card={c} />)}
      </HStack>
      <HStack space="md" className="w-full gap-2.5">
        <CardBack age={1} />
        <CardBack age={2} />
        <CardBack age={3} />
        <CardBack age={4} />
        <CardBack age={5} />
      </HStack>
      <HStack space="md" className="w-full gap-2.5">
        <CardBack age={6} />
        <CardBack age={7} />
        <CardBack age={8} />
        <CardBack age={9} />
        <CardBack age={10} />
      </HStack>
    </Box>
  );
};
