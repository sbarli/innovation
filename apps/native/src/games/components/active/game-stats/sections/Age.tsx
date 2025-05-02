import { FC, useState } from 'react';

import { HandCoinsIcon } from 'lucide-react-native';

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

export const Age: FC<{ age: number }> = ({ age }) => {
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
            <Icon as={HandCoinsIcon} />
            <Text>{age}</Text>
          </HStack>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text>Highest age on board</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
