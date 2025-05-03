import { Redirect } from 'expo-router';

import { Routes } from '../../src/app-core/constants/navigation';
import { AuthScreen } from '../../src/authentication/screens/AuthScreen';

// eslint-disable-next-line import/no-default-export
export default function Auth() {
  const trainingMode = !!process.env['EXPO_PUBLIC_TRAINING_MODE_ENABLED'];
  // Easy redirect when training
  if (trainingMode) {
    return <Redirect href={Routes.TRAINING.path} />;
  }
  return <AuthScreen />;
}
