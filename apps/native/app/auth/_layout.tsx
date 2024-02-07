import { Slot } from 'expo-router';

import { HeaderNoNav } from '../../src/app-core/components/headers/HeaderNoNav';

// eslint-disable-next-line import/no-default-export
export default function AuthLayout() {
  return (
    <>
      <HeaderNoNav showLogout={false} title="Auth" />
      <Slot />
    </>
  );
}
