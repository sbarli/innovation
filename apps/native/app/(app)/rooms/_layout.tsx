import { Slot } from 'expo-router';

import { HeaderWithBackNavigation } from '../../../src/app-core/components/headers/HeaderWithBackNavigation';

// eslint-disable-next-line import/no-default-export
export default function RoomsLayout() {
  return (
    <>
      <HeaderWithBackNavigation title="Rooms" />
      <Slot />
    </>
  );
}
