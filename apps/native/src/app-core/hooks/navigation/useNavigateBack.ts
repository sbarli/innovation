import { router, usePathname } from 'expo-router';

import { Routes } from '../../constants/navigation';

export const useNavigateBack = () => {
  const currentPath = usePathname();
  const navigateBack = () => {
    if (!router.canGoBack() && currentPath === Routes.HOME) {
      console.warn('Tried to navigate back, but nowhere to go back.');
      return;
    }
    if (!router.canGoBack() && currentPath !== Routes.HOME) {
      console.warn('Tried to navigate back, but nowhere to go back. Routing to Home');
      return router.push(Routes.HOME);
    }
    return router.back();
  };
  return { navigateBack };
};
