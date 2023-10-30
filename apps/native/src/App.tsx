import { config } from '@gluestack-ui/config';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  GluestackUIProvider,
  Text,
} from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';

import { AllCards } from './components/cards/AllCards';
import { AllPlayers } from './components/players/AllPlayers';
import { GraphQLProvider } from './graphql/ApolloProvider';

const App = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" backgroundColor="#ffffff">
      <Text>Native</Text>
      <Button
        onPress={() => {
          console.log('Pressed!');
          alert('Pressed!');
        }}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      >
        <ButtonText>Boop</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
      <AllCards />
      <AllPlayers />
      <StatusBar style="auto" />
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default function AppWrapper() {
  return (
    <GluestackUIProvider config={config}>
      <GraphQLProvider>
        <App />
      </GraphQLProvider>
    </GluestackUIProvider>
  );
}
