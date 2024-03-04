import { Box, StatusBar, Text } from '@gluestack-ui/themed';

import { GetGameQuery } from '@inno/gql';

export interface IGameScreenProps {
  gameData: GetGameQuery['getGame'];
}

export const GameScreen = ({ gameData }: IGameScreenProps) => {
  return (
    <>
      <StatusBar />
      <Box alignItems="center">
        <Text>Welcome to the Game Screen for game {gameData?._id || '...'}</Text>
      </Box>
    </>
  );
};
