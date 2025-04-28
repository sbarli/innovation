import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Box } from '../app-core/components/gluestack/box';
import { Button, ButtonText } from '../app-core/components/gluestack/button';
import { Routes } from '../app-core/constants/navigation';
// import { AllCards } from '../cards/components/AllCards';

export const TrainingScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Box className="items-center justify-center">
        <Link href={Routes.TRAINING_GAME} asChild>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText>Game Training</ButtonText>
          </Button>
        </Link>
      </Box>
      {/* <AllCards /> */}
    </>
  );
};
