import { StatusBar } from 'expo-status-bar';

import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { AddIcon } from '@/components/ui/icon';

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
