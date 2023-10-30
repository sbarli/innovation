import { Text, View } from '@gluestack-ui/themed';

import { useGetPlayersQuery } from '@inno/gql';

export const AllPlayers = () => {
  const { data, loading } = useGetPlayersQuery({
    variables: {
      searchData: {
        searchField: 'playerId',
        searchValues: ['pimone', 'tumbaa'],
      },
    },
  });
  const players = data?.getPlayers;
  if (loading && !players) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Players</Text>
      {players?.map((p) => <Text key={p.playerId}>{p.name}</Text>)}
    </View>
  );
};
