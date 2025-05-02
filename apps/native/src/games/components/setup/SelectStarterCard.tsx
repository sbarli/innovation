import { FC, ReactElement, useState } from 'react';

import { SocketEvent } from '@inno/constants';

import { Box } from '../../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../../app-core/components/gluestack/button';
import { Text } from '../../../app-core/components/gluestack/text';
import { CardFrontWithDetails } from '../../../cards/components/CardFrontWithDetails';
import { useCardsContext } from '../../../cards/state/CardsProvider';
import { useRoomContext } from '../../../rooms/state/RoomProvider';
import { useSocketContext } from '../../../websockets/SocketProvider';
import { useCurrentPlayerGameData } from '../../hooks/useCurrentPlayerGameData';
import { useMeldCard } from '../../hooks/useMeldCard';

export const SelectStarterCard: FC = () => {
  const { cards } = useCardsContext();
  const { currentRoomId } = useRoomContext();
  const { socket } = useSocketContext();
  const { currentPlayerGameData } = useCurrentPlayerGameData();
  const { loading: meldingInProgress, error: meldingError, meldCardFromHand } = useMeldCard();

  const [selectedCardRef, setSelectedCardRef] = useState<string>('');

  const handleSelectCard = (cardRef: string) => {
    setSelectedCardRef(cardRef);
  };

  const emitSocketStarterCardMeldedEvent = () => {
    if (!socket) {
      return;
    }
    socket.emit(SocketEvent.STARTER_CARD_MELDED, { roomId: currentRoomId });
  };

  const handleConfirmSelectedCard = () => {
    if (!selectedCardRef) {
      return;
    }
    meldCardFromHand({
      cardId: selectedCardRef,
      isStarterMeld: true,
      onSuccess: emitSocketStarterCardMeldedEvent,
    });
  };

  if (!currentPlayerGameData || !cards) {
    return (
      <Box>
        <Text>Missing user game data and/or cards data</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text>Here is your starter hand. Select your first card to meld.</Text>
      {!!meldingError && <Text>An error occurred while melding your card: {meldingError}</Text>}
      {!!selectedCardRef && <Text>You selected {cards[selectedCardRef].name}</Text>}
      {currentPlayerGameData.hand.reduce((acc, cardRef) => {
        const card = cards[cardRef];
        if (!card) {
          return acc;
        }
        acc.push(
          <Box key={cardRef} className="p-[2px] mb-[2px] items-center">
            <Box
              className={` ${selectedCardRef === cardRef ? 'border-[2px]' : 'border-[0px]'} border-green-500 p-[2px] `}
            >
              <CardFrontWithDetails card={card} />
            </Box>
            <Button
              onPress={() => handleSelectCard(cardRef)}
              size="sm"
              variant="outline"
              action="primary"
              isDisabled={selectedCardRef === cardRef || meldingInProgress}
              isFocusVisible={false}
            >
              <ButtonText>
                {selectedCardRef === cardRef ? `Selected` : `Select ${card.name}`}
              </ButtonText>
            </Button>
          </Box>
        );
        return acc;
      }, [] as ReactElement[])}
      <Button
        onPress={handleConfirmSelectedCard}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={!selectedCardRef || meldingInProgress}
        isFocusVisible={false}
      >
        <ButtonText>Confirm meld card</ButtonText>
      </Button>
    </Box>
  );
};
