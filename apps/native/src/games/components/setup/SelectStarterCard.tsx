import { FC, ReactElement, useState } from 'react';

import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';

import { CardFrontWithDetails } from '../../../cards/components/CardFrontWithDetails';
import { useCardsContext } from '../../../cards/state/CardsProvider';
import { useCurrentPlayerGameData } from '../../hooks/useCurrentPlayerGameData';
import { useMeldCard } from '../../hooks/useMeldCard';

export const SelectStarterCard: FC = () => {
  const { cards } = useCardsContext();
  const { currentPlayerGameData } = useCurrentPlayerGameData();
  const { loading: meldingInProgress, error: meldingError, meldCardFromHand } = useMeldCard();

  const [selectedCardRef, setSelectedCardRef] = useState<string>('');

  const handleSelectCard = (cardRef: string) => {
    setSelectedCardRef(cardRef);
  };

  const handleConfirmSelectedCard = () => {
    if (!selectedCardRef) {
      return;
    }
    console.log('Ready to submit selected card: ', selectedCardRef);
    meldCardFromHand({ cardId: selectedCardRef });
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
          <Box key={cardRef} padding={2} marginBottom={2} alignItems="center">
            <Box
              borderColor={'$green500'}
              borderWidth={selectedCardRef === cardRef ? 2 : 0}
              padding={2}
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
