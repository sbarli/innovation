import { Slot } from 'expo-router';

import { HeaderWithBackNavigation } from '../../src/app-core/components/HeaderWithBackNavigation';

// eslint-disable-next-line import/no-default-export
export default function HomeLayout() {
  return (
    <>
      <HeaderWithBackNavigation title="Home" />
      <Slot />
    </>
  );
}
