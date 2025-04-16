export const BACKEND_API = process.env['EXPO_PUBLIC_BACKEND_URL'] ?? 'http://localhost:8080';
export const BACKEND_GQL_API = `${BACKEND_API}/graphql`;
export const WEBSOCKET_API = process.env['EXPO_PUBLIC_WEBSOCKET_URL'] ?? 'ws://localhost:8080';
