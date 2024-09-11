import { AddIcon, Box, Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';

export const ExamplesScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Box alignItems="center">
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
