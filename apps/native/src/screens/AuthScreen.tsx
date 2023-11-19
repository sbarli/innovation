import { Box, Heading } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';

export const AuthScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Box alignItems="center">
        <Heading size="lg">Innovation</Heading>
      </Box>
    </>
  );
};
