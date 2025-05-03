import { FC, useState } from 'react';

import { HandIcon } from 'lucide-react-native';

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
import { text } from '../../../../../app-core/intl/en';

export const Hand: FC<{ numCardsInHand: number }> = ({ numCardsInHand }) => {
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
            <Icon as={HandIcon} />
            <Text>{numCardsInHand}</Text>
          </HStack>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text>{text.statsDrawer.HAND_POPOVER}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
