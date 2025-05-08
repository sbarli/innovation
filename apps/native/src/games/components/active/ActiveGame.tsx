import { FC, useState } from 'react';

import { ScrollView } from 'react-native';

import { GameStage } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../../app-core/components/gluestack/button';
import { Divider } from '../../../app-core/components/gluestack/divider';
import { HStack } from '../../../app-core/components/gluestack/hstack';
import { Text } from '../../../app-core/components/gluestack/text';
import { text } from '../../../app-core/intl/en';
import { useCurrentPlayerGameData } from '../../hooks/useCurrentPlayerGameData';
import { useGameContext } from '../../state/GameProvider';

import { Boards } from './board/Boards';
import { CurrentUserHand } from './current-user-hand/CurrentUserHand';
import { StatsDrawer } from './game-stats/StatsDrawer';

export const ActiveGame: FC = () => {
  const { metadata } = useGameContext();
  const currentPlayerGameData = useCurrentPlayerGameData();
  const [showBoard, setShowBoard] = useState(true);

  const toggleBoardVisibility = () => setShowBoard((s) => !s);

  if (!currentPlayerGameData || metadata?.stage !== GameStage.ACTIVE) {
    return (
      <Box>
        <Text>{text.activeGame.MISSING_ACTIVE_GAME_DATA}</Text>
      </Box>
    );
  }

  return (
    <Box className="w-full pl-[25px] pr-[25px]">
      <HStack space="md" className="justify-between">
        <StatsDrawer />
        <HStack space="md" className="justify-between">
          <CurrentUserHand />
          <Button size="md" onPress={toggleBoardVisibility} className="w-md">
            <ButtonText>
              {showBoard ? text.common.HIDE : text.common.SHOW} {text.activeGame.BOARDS}
            </ButtonText>
          </Button>
        </HStack>
      </HStack>
      <Divider className="my-5" />
      <ScrollView>
        <Boards visible={showBoard} />
      </ScrollView>
    </Box>
  );
};
