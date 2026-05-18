import { ExpoConfig, ConfigContext } from 'expo/config';

const APP_NAME = 'Innovation';
const APP_SLUG = 'innovation';
const APP_VERSION = { major: 0, minor: 1, fix: 0 };

const getAppVersion = () => `${APP_VERSION.major}.${APP_VERSION.minor}.${APP_VERSION.fix}`;

// eslint-disable-next-line import/no-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: APP_SLUG,
  version: getAppVersion(),
  orientation: 'portrait',
  scheme: 'inno',
  web: {
    bundler: 'metro',
    output: 'static',
  },
  plugins: ['expo-router', 'expo-secure-store'],
  newArchEnabled: true,
  extra: {
    eas: {
      projectId: process.env['EAS_PROJECT_ID'] ?? 'ea3d151c-beca-4db0-a089-268fbbe3d3ea',
    },
  },
  owner: process.env['EXPO_OWNER_HANDLE'] ?? 'sbarli',
});
