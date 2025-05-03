import { FC, useState } from 'react';

import { TrophyIcon } from 'lucide-react-native';

import { HStack } from '../../../../../app-core/components/gluestack/hstack';
import { Icon } from '../../../../../app-core/components/gluestack/icon';
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from '../../../../../app-core/components/gluestack/popover';
import { Text } from '../../../../../app-core/components/gluestack/text';
import { NUM_ACHIEVEMENTS_REQUIRED_TO_WIN } from '../../../../../app-core/constants/game.constants';
import { text } from '../../../../../app-core/intl/en';

export const Achievements: FC<{ totalNumAchievements: number }> = ({ totalNumAchievements }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      placement="top"
      size="sm"
      trigger={(triggerProps) => {
        return (
          <HStack {...triggerProps}>
            <Icon as={TrophyIcon} />
            <Text>{`${totalNumAchievements} / ${NUM_ACHIEVEMENTS_REQUIRED_TO_WIN}`}</Text>
          </HStack>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text>{text.statsDrawer.ACHIEVEMENTS_POPOVER}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
