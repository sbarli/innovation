// eslint-disable-next-line turbo/no-undeclared-env-vars
export const BACKEND_API = process.env.EXPO_PUBLIC_BACKEND_URL ?? '';
export const BACKEND_GQL_API = `${BACKEND_API}/graphql`;
