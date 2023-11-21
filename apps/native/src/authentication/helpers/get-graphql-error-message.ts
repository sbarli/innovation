import { ApolloError } from '@apollo/client';

export const getGraphQLErrorMessage = (error: ApolloError, fallback: string = 'Unknown Error') =>
  error?.graphQLErrors?.[0]?.message ?? fallback;
