import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthProvider } from '../src/authentication/state/AuthProvider';
import { GraphQLProvider } from '../src/graphql/ApolloProvider';
import { SocketProvider } from '../src/websockets/SocketProvider';

// // UGLY HACK
// // This is a hack to make sure that the console logs are printed in the
// // terminal when running the app in development mode. This is needed
// // because somehow babel/metro combination swallows logs when loading
// // @babel/plugin-proposal-class-properties
// // See this issue for more details: https://github.com/facebook/metro/issues/877
// // THIS FILE SHOULDN'T EXIST BUT IT DOES BECAUSE I WAS NOT ABLE TO FIX IT 🤷
// // If you have a better solution, please fix it and remove this file.

// if (__DEV__) {
//   const primitiveTypes = ['string', 'number', 'boolean'];
//   const logLevels = ['log', 'debug', 'info', 'warn', 'error'];

//   const transformArgs = (args: any[]) => {
//     return args.map((arg: { stack: any; toString: () => any } | undefined) => {
//       if (arg === undefined) return 'undefined';
//       if (arg instanceof Error) {
//         if (arg.stack) return arg.stack;
//         return arg.toString();
//       }
//       if (arg instanceof Date) return arg.toString();
//       if (primitiveTypes.includes(typeof arg)) {
//         return arg.toString();
//       } else {
//         return JSON.stringify(arg);
//       }
//     });
//   };

//   const consoleProxy = new Proxy(console, {
//     get: (target, prop) => {
//       const value = target[prop as string];
//       if (logLevels.includes(prop as string)) {
//         return (...args: any) => {
//           // we proxy the call to itself, but we transform the arguments to strings before
//           // so that they are printed in the terminal
//           return value.apply(this, transformArgs(args));
//         };
//       }
//       return value;
//     },
//   });

//   // eslint-disable-next-line no-global-assign
//   console = consoleProxy;
// }

// eslint-disable-next-line import/no-default-export
export default function AppProvidersWrapper() {
  if (__DEV__) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }
  return (
    <GluestackUIProvider config={config}>
      <GraphQLProvider>
        <SocketProvider>
          <SafeAreaView>
            <AuthProvider>
              <Slot />
            </AuthProvider>
          </SafeAreaView>
        </SocketProvider>
      </GraphQLProvider>
    </GluestackUIProvider>
  );
}
