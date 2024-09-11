import { Box, HStack, Text } from '@gluestack-ui/themed';

import { useGetAllCardsQuery } from '@inno/gql';

import { CardFront } from './CardFront';

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
    <HStack w="$full" paddingHorizontal="$10">
      <Box>{allCards?.slice(0, 3).map((c) => <CardFront key={c.cardId} card={c} />)}</Box>
      <Box>{allCards?.slice(3, 6).map((c) => <CardFront key={c.cardId} card={c} />)}</Box>
      <Box>{allCards?.slice(6, 9).map((c) => <CardFront key={c.cardId} card={c} />)}</Box>
    </HStack>
  );
};
