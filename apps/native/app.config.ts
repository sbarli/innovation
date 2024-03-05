import { ExpoConfig, ConfigContext } from 'expo/config';

const APP_NAME = 'Innovation';
const APP_ORIENTATION = 'portrait';
const APP_SLUG = 'innovation';
const APP_VERSION = {
  major: 0,
  minor: 1,
  fix: 0,
};

const getAppVersion = () => `${APP_VERSION.major}.${APP_VERSION.minor}.${APP_VERSION.fix}`;

// eslint-disable-next-line import/no-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: APP_SLUG,
  version: getAppVersion(),
  orientation: APP_ORIENTATION,
  extra: {
    eas: {
      projectId: process.env['EXPO_PUBLIC_PROJECT_ID'] ?? '',
    },
  },
  owner: process.env['EXPO_PUBLIC_OWNER_HANDLE'] ?? '',
  plugins: ['expo-router'],
});
