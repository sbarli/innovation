import { Slot } from 'expo-router';

import { HeaderNoNav } from '../../src/app-core/components/headers/HeaderNoNav';
import { Routes } from '../../src/app-core/constants/navigation';

// eslint-disable-next-line import/no-default-export
export default function AuthLayout() {
  return (
    <>
      <HeaderNoNav showLogout={false} title={Routes.AUTH.name} />
      <Slot />
    </>
  );
}
