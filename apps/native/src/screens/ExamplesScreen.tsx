import { StatusBar } from 'expo-status-bar';

import { Box } from '../app-core/components/gluestack/box';
import { Button, ButtonIcon, ButtonText } from '../app-core/components/gluestack/button';
import { AddIcon } from '../app-core/components/gluestack/icon';

export const ExamplesScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Box className="items-center">
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
      </Box>
    </>
  );
};
