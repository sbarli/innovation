import { PropsWithChildren } from 'react';

import { ApolloProvider } from '@apollo/client';

import { client } from './client';

export const GraphQLProvider = ({ children }: PropsWithChildren) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
