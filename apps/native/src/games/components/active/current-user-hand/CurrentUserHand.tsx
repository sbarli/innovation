import { useState } from 'react';

import { FlatList } from 'react-native';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '../../../../app-core/components/gluestack/actionsheet';
import { Button, ButtonText } from '../../../../app-core/components/gluestack/button';
import { Heading } from '../../../../app-core/components/gluestack/heading';
import { text } from '../../../../app-core/intl/en';
import { CardFront } from '../../../../cards/components/front/CardFront';
import { useCardsContext } from '../../../../cards/state/CardsProvider';
import { useUserPlayerGameData } from '../../../hooks/useUserPlayerGameData';

export const CurrentUserHand = () => {
  const { cards } = useCardsContext();
  const { hand = [] } = useUserPlayerGameData() ?? {};
  const [showHand, setShowHand] = useState(false);

  const handleCloseHand = () => setShowHand(false);

  return (
    <>
      <Button variant="outline" onPress={() => setShowHand(true)}>
        <ButtonText>{text.currentUserHand.SHOW_HAND_CTA}</ButtonText>
      </Button>
      <Actionsheet isOpen={showHand} onClose={handleCloseHand}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Heading size="lg">{text.currentUserHand.HAND_HEADER}</Heading>
          <FlatList
            data={hand}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item }) => <CardFront card={cards[item]} />}
          />
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};
