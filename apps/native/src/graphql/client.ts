import { ApolloClient, InMemoryCache } from '@apollo/client';

import { BACKEND_GQL_API } from '../app-core/constants/manifest';

export const client = new ApolloClient({
  uri: BACKEND_GQL_API,
  cache: new InMemoryCache(),
});
