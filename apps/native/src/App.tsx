import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'ui';

import { AllCards } from './components/cards/AllCards';
import { GraphQLProvider } from './graphql/ApolloProvider';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Native</Text>
      <Button
        onClick={() => {
          console.log('Pressed!');
          alert('Pressed!');
        }}
        text="Boop"
      />
      <AllCards />
      <StatusBar style="auto" />
    </View>
  );
};

// eslint-disable-next-line import/no-default-export
export default function AppWrapper() {
  return (
    <GraphQLProvider>
      <App />
    </GraphQLProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 36,
  },
});
