import { Box, HStack, Text } from '@gluestack-ui/themed';

import { useGetAllCardsQuery } from '@inno/gql';

import { CardBack } from './back/CardBack';
import { CardFront } from './front/CardFront';

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
    <Box w="$full" paddingHorizontal="$10">
      <HStack w="$full" space="md">
        {allCards?.slice(0, 3).map((c) => <CardFront key={c.cardId} card={c} />)}
      </HStack>
      <HStack w="$full" space="md">
        <CardBack age={1} />
        <CardBack age={2} />
        <CardBack age={3} />
        <CardBack age={4} />
        <CardBack age={5} />
      </HStack>
      <HStack w="$full" space="md">
        <CardBack age={6} />
        <CardBack age={7} />
        <CardBack age={8} />
        <CardBack age={9} />
        <CardBack age={10} />
      </HStack>
    </Box>
  );
};
