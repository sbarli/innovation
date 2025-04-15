import { useState } from 'react';

import { Card as CardType } from '@inno/gql';

import { CardDetails } from './front/CardDetails';
import { CardFront } from './front/CardFront';

import { Heading } from '../../app-core/components/gluestack/heading';
import { Icon, CloseIcon } from '../../app-core/components/gluestack/icon';
import {
  Popover,
  PopoverBackdrop,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '../../app-core/components/gluestack/popover';
import { Pressable } from '../../app-core/components/gluestack/pressable';

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
