import { ExpoConfig, ConfigContext } from 'expo/config';

const APP_NAME = 'Innovation';
const APP_ORIENTATION = 'landscape';
const APP_SLUG = 'innovation';
const APP_VERSION = {
  major: 1,
  minor: 0,
  fix: 0,
};
const EXPO_PROJECT_ID = 'ea3d151c-beca-4db0-a089-268fbbe3d3ea';
const EXPO_OWNER_HANDLE = 'sbarli';

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
      projectId: EXPO_PROJECT_ID,
    },
  },
  owner: EXPO_OWNER_HANDLE,
});
