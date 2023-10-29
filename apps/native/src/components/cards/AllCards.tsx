import { Text, View } from 'react-native';

import { useGetAllCardsQuery } from '@inno/gql';

export const AllCards = () => {
  const { data, loading } = useGetAllCardsQuery();
  const allCards = data?.getAllCards;
  if (loading && !allCards) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>First 5 Cards</Text>
      {allCards?.slice(0, 5).map((c) => <Text key={c.cardId}>{c.name}</Text>)}
    </View>
  );
};
