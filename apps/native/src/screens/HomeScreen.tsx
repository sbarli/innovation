import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Routes } from '../app-core/constants/navigation';

export const HomeScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Box alignItems="center">
        <Link href={Routes.AUTH} asChild>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText>Authenticate</ButtonText>
          </Button>
        </Link>
        <Link href={Routes.EXAMPLES} asChild>
          <Button
            size="md"
            variant="solid"
            action="secondary"
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText>Examples</ButtonText>
          </Button>
        </Link>
      </Box>
    </>
  );
};
