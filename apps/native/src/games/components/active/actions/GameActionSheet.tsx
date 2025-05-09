import { FC } from 'react';

import { FlatList } from 'react-native';

import { Card } from '@inno/gql';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '../../../../app-core/components/gluestack/actionsheet';
import { Button, ButtonText } from '../../../../app-core/components/gluestack/button';
import { Heading } from '../../../../app-core/components/gluestack/heading';
import { VStack } from '../../../../app-core/components/gluestack/vstack';
import { text } from '../../../../app-core/intl/en';
import { CardFrontWithDetails } from '../../../../cards/components/CardFrontWithDetails';

export interface IGameActionSheetProps {
  cards: Card[];
  headerText: string;
  onClose: () => void;
  onSelect: (cardId: string) => void;
  visible: boolean;
}

interface ISelectableCardFrontWithDetailsProps extends Pick<IGameActionSheetProps, 'onSelect'> {
  card: Card;
}

const SelectableCardFrontWithDetails: FC<ISelectableCardFrontWithDetailsProps> = ({
  card,
  onSelect,
}) => {
  return (
    <VStack space="md">
      <CardFrontWithDetails card={card} />
      <Button size="sm" onPress={() => onSelect(card._id)}>
        <ButtonText>{text.common.SELECT}</ButtonText>
      </Button>
    </VStack>
  );
};

export const GameActionSheet: FC<IGameActionSheetProps> = ({
  cards,
  headerText,
  onClose,
  onSelect,
  visible,
}) => {
  const handleClose = () => onClose();

  return (
    <Actionsheet isOpen={visible} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Heading size="lg" className="mb-2">
          {headerText}
        </Heading>
        <FlatList
          data={cards}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <SelectableCardFrontWithDetails card={item} onSelect={onSelect} />
          )}
        />
      </ActionsheetContent>
    </Actionsheet>
  );
};
