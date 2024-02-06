import { useLocalSearchParams } from 'expo-router';

import { useGetRoomQuery } from '@inno/gql';

import { HeaderNoNav } from '../../../../src/app-core/components/headers/HeaderNoNav';
import { RoomScreen } from '../../../../src/rooms/screens/RoomScreen';

// eslint-disable-next-line import/no-default-export
export default function Room() {
  const { roomId } = useLocalSearchParams();
  const { data, loading, error } = useGetRoomQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      roomId: (roomId as string) ?? '',
    },
    skip: !roomId || typeof roomId !== 'string',
  });
  return (
    <>
      <HeaderNoNav title={data?.getRoom?.name ?? '...'} />
      <RoomScreen roomData={data?.getRoom} loading={loading} error={error} />
    </>
  );
}
