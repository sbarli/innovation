import { Slot, useLocalSearchParams } from 'expo-router';

import { HeaderNoNav } from '../../../../src/app-core/components/headers/HeaderNoNav';

// eslint-disable-next-line import/no-default-export
export default function RoomLayout() {
  const { roomId } = useLocalSearchParams();

  return (
    <>
      <HeaderNoNav title={roomId as string} />
      <Slot />
    </>
  );
}
