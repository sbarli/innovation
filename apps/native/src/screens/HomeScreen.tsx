import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Box } from '../app-core/components/gluestack/box';
import { Button, ButtonText } from '../app-core/components/gluestack/button';
import { Routes } from '../app-core/constants/navigation';
import { CreateRoomCTA } from '../rooms/components/CreateRoomCTA';
import { JoinRoomCTA } from '../rooms/components/JoinRoomCTA';

export const HomeScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Box className="items-center">
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
        <CreateRoomCTA />
        <JoinRoomCTA />
        <Link href={Routes.TRAINING} asChild>
          <Button
            size="md"
            variant="solid"
            action="secondary"
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText>Training</ButtonText>
          </Button>
        </Link>
      </Box>
    </>
  );
};
