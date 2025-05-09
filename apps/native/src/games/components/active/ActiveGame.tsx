import { FC, useState } from 'react';

import { ScrollView } from 'react-native';

import { GameStage } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../../app-core/components/gluestack/button';
import { Divider } from '../../../app-core/components/gluestack/divider';
import { HStack } from '../../../app-core/components/gluestack/hstack';
import { Text } from '../../../app-core/components/gluestack/text';
import { text } from '../../../app-core/intl/en';
import { useUserPlayerGameData } from '../../hooks/useUserPlayerGameData';
import { useGameContext } from '../../state/GameProvider';

import { AvailableActions } from './actions/AvailableActions';
import { Boards } from './board/Boards';
import { CurrentUserHand } from './current-user-hand/CurrentUserHand';
import { StatsDrawer } from './game-stats/StatsDrawer';

export const ActiveGame: FC = () => {
  const { metadata } = useGameContext();
  const userPlayerGameData = useUserPlayerGameData();
  const [showBoard, setShowBoard] = useState(true);

  const toggleBoardVisibility = () => setShowBoard((s) => !s);

  if (!userPlayerGameData || metadata?.stage !== GameStage.ACTIVE) {
    return (
      <Box>
        <Text>{text.activeGame.MISSING_ACTIVE_GAME_DATA}</Text>
      </Box>
    );
  }

  const userIsCurrentPlayer =
    metadata?.currentPlayerId && metadata.currentPlayerId === userPlayerGameData.playerId;

  return (
    <Box className="w-full pl-[25px] pr-[25px]">
      <HStack space="md" className="justify-between">
        <StatsDrawer />
        <HStack space="md" className="justify-between">
          <CurrentUserHand />
          <Button variant="outline" size="md" onPress={toggleBoardVisibility} className="w-md">
            <ButtonText>
              {showBoard ? text.common.HIDE : text.common.SHOW} {text.activeGame.BOARDS}
            </ButtonText>
          </Button>
        </HStack>
      </HStack>
      <Divider className="my-5" />
      {userIsCurrentPlayer ? (
        <>
          <AvailableActions />
          <Divider className="my-5" />
        </>
      ) : null}
      <ScrollView>
        <Boards visible={showBoard} />
      </ScrollView>
    </Box>
  );
};
