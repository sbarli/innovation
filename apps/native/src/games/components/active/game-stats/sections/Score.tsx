import { FC, useState } from 'react';

import { StarIcon } from 'lucide-react-native';

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

export const Score: FC<{ score: number }> = ({ score }) => {
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
            <Icon as={StarIcon} />
            <Text>{score}</Text>
          </HStack>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text>{text.statsDrawer.SCORE_POPOVER}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
