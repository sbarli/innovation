import { useState } from 'react';

import { Button, ButtonIcon, ButtonText } from '../../../../app-core/components/gluestack/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '../../../../app-core/components/gluestack/drawer';
import { Heading } from '../../../../app-core/components/gluestack/heading';
import { MenuIcon } from '../../../../app-core/components/gluestack/icon';
import { text } from '../../../../app-core/intl/en';
import { useGameContext } from '../../../state/GameProvider';

import { SinglePlayerDetails } from './SinglePlayerDetails';

export const StatsDrawer = () => {
  const { players, hands } = useGameContext();
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        onPress={() => {
          setShowDrawer(true);
        }}
      >
        <ButtonIcon as={MenuIcon} className="text-typography-500" />
        <ButtonText>{text.statsDrawer.STATS_HEADER}</ButtonText>
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="sm"
        anchor="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading size="2xl">{text.statsDrawer.PLAYER_STATS_HEADER}</Heading>
          </DrawerHeader>
          <DrawerBody>
            {players && hands
              ? // TODO: maybe make this a FlatList?
                Object.keys(players).map((pid) => (
                  <SinglePlayerDetails
                    key={pid}
                    playerData={players[pid]}
                    numCardsInHand={hands[pid].length}
                  />
                ))
              : null}
          </DrawerBody>
          <DrawerFooter>
            <Button
              onPress={() => {
                setShowDrawer(false);
              }}
              className="flex-1"
            >
              <ButtonText>{text.common.CLOSE}</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
