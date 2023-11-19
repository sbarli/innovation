import { Box, Text } from '@gluestack-ui/themed';

import { useGetAllCardsQuery } from '@inno/gql';

export const AllCards = () => {
  const { data, loading } = useGetAllCardsQuery();
  const allCards = data?.getAllCards;
  if (loading && !allCards) {
    return (
      <Box>
        <Text>Loading</Text>
      </Box>
    );
  }
  return (
    <Box>
      <Text>First 5 Cards</Text>
      {allCards?.slice(0, 5).map((c) => <Text key={c.cardId}>{c.name}</Text>)}
    </Box>
  );
};
