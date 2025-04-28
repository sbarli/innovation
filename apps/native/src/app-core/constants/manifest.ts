export type AppEnv = 'development' | 'staging' | 'production';

export const BACKEND_API: string = process.env.EXPO_PUBLIC_BACKEND_URL ?? 'http://localhost:8080';
export const BACKEND_GQL_API: string = `${BACKEND_API}/graphql`;
export const WEBSOCKET_API: string = process.env.EXPO_PUBLIC_WEBSOCKET_URL ?? 'ws://localhost:8080';

export const APP_ENV: AppEnv = process.env.EXPO_PUBLIC_APP_ENV ?? 'development';

export const isDev = APP_ENV === 'development';
export const isStaging = APP_ENV === 'staging';
export const isProd = APP_ENV === 'production';

export const TESTER_PW: string = process.env.EXPO_PUBLIC_TESTER_PW ?? '';
export const TESTER_EMAILS = ['pimone@priderock.com', 'tumbaa@priderock.com'];
