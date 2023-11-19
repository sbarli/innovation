import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BACKEND_GQL_API } from '../app-core/constants/manifest';
import { StorageKeys } from '../storage/storage.constants';
import { getAsyncStorageItem } from '../storage/useAsyncStorage';

const httpLink = createHttpLink({
  uri: BACKEND_GQL_API,
});

const authLink = setContext((_, { headers }) => {
  const token = getAsyncStorageItem(StorageKeys.AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
