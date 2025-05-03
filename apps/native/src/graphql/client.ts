import { ApolloClient, InMemoryCache, createHttpLink, from, fromPromise } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { RefreshTokenDocument } from '@inno/gql';

import { BACKEND_GQL_API } from '../app-core/constants/manifest';
import { Routes } from '../app-core/constants/navigation';
import { StorageKeys } from '../app-core/constants/storage.constants';

const httpLink = createHttpLink({
  uri: BACKEND_GQL_API,
});

const authLink = setContext(async (context, { headers }) => {
  const { getItem: getAuthToken } = useAsyncStorage(StorageKeys.AUTH_TOKEN);
  const { getItem: getRefreshToken } = useAsyncStorage(StorageKeys.REFRESH_TOKEN);

  const authToken = await getAuthToken();
  const refreshToken = await getRefreshToken();
  const isRefreshAttempt = context.operationName === 'RefreshToken';

  let authorizationToken = authToken;
  if (isRefreshAttempt) {
    authorizationToken = refreshToken;
  }

  return {
    ...headers,
    headers: {
      authorization: authorizationToken ? `Bearer ${authorizationToken}` : null,
    },
  };
});

const getNewToken = async () => {
  return client?.mutate({
    mutation: RefreshTokenDocument,
  });
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const { setItem: setAuthToken, removeItem: clearAuthToken } = useAsyncStorage(
    StorageKeys.AUTH_TOKEN
  );
  const { removeItem: clearRefreshToken } = useAsyncStorage(StorageKeys.REFRESH_TOKEN);

  const redirectToLogout = () => {
    clearAuthToken();
    clearRefreshToken();
    router.push(Routes.LOGOUT.path);
    return;
  };

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        // Handle attempting to refresh auth token when error is UNAUTHENTICATED
        case 'UNAUTHENTICATED':
          // if the token refresh failed, now consider this really unauthorized and redirect to Auth screen
          if (operation.operationName === 'RefreshToken') {
            return redirectToLogout();
          }
          // otherwise, attempt the refresh
          return fromPromise(
            getNewToken()
              .then((response) => {
                // extract new authToken from response data and return it
                const { authToken } = response?.data?.refreshToken ?? {};
                if (!authToken) {
                  throw new Error('No authToken returned');
                }
                return authToken;
              })
              .catch(() => {
                return redirectToLogout();
              })
          )
            .filter((value) => Boolean(value))
            .flatMap((authToken) => {
              setAuthToken(authToken);
              const oldHeaders = operation.getContext().headers;
              // modify the operation context with a new token
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${authToken}`,
                },
              });

              // retry the request, returning the new observable
              return forward(operation);
            });
      }
    }
  }
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
