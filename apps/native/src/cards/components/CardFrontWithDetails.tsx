import { useState } from 'react';

import { Card as CardType } from '@inno/gql';

import { CardDetails } from './front/CardDetails';
import { CardFront } from './front/CardFront';

import { Heading } from '@/components/ui/heading';
import { Icon, CloseIcon } from '@/components/ui/icon';
import {
  Popover,
  PopoverBackdrop,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@/components/ui/popover';
import { Pressable } from '@/components/ui/pressable';

export interface ICardFrontWithDetailsProps {
  card: CardType;
}

export const CardFrontWithDetails = ({ card }: ICardFrontWithDetailsProps) => {
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const handleCloseCardDetails = () => {
    setIsCardDetailOpen(false);
  };
  const handleOpenCardDetails = () => {
    setIsCardDetailOpen(true);
  };
  return (
    <>
      <Popover
        isOpen={isCardDetailOpen}
        onClose={handleCloseCardDetails}
        onOpen={handleOpenCardDetails}
        placement="bottom"
        size="md"
        trigger={(triggerProps: any) => {
          return (
            <Pressable {...triggerProps}>
              <CardFront card={card} />
            </Pressable>
          );
        }}
      >
        <PopoverBackdrop />
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Heading size="sm">{card.name}</Heading>
            <PopoverCloseButton>
              <Icon as={CloseIcon} />
            </PopoverCloseButton>
          </PopoverHeader>
          <PopoverBody>
            <CardDetails card={card} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
