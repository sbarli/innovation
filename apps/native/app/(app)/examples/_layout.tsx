import { Slot } from 'expo-router';

import { HeaderWithBackNavigation } from '../../../src/app-core/components/headers/HeaderWithBackNavigation';
import { Routes } from '../../../src/app-core/constants/navigation';

// eslint-disable-next-line import/no-default-export
export default function ExamplesLayout() {
  return (
    <>
      <HeaderWithBackNavigation title={Routes.EXAMPLES.name} />
      <Slot />
    </>
  );
}
