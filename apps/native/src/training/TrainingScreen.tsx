import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Routes } from '../app-core/constants/navigation';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
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
            action="secondary"
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
