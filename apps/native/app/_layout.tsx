import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthProvider } from '../src/authentication/state/AuthProvider';
import { GraphQLProvider } from '../src/graphql/ApolloProvider';

// eslint-disable-next-line import/no-default-export
export default function AppProvidersWrapper() {
  return (
    <GluestackUIProvider config={config}>
      <GraphQLProvider>
        <SafeAreaView>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </SafeAreaView>
      </GraphQLProvider>
    </GluestackUIProvider>
  );
}
