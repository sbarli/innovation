import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { BACKEND_GQL_API } from '../app-core/constants/manifest';
import { StorageKeys } from '../app-core/constants/storage.constants';

const httpLink = createHttpLink({
  uri: BACKEND_GQL_API,
});

const authLink = setContext(async (_, { headers }) => {
  const { getItem } = useAsyncStorage(StorageKeys.AUTH_TOKEN);
  const token = await getItem();

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
