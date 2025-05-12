import { useCallback, useEffect, useMemo, useState } from 'react';

import { SocketEvent } from '@inno/constants';

import { Button, ButtonText } from '../../../../app-core/components/gluestack/button';
import { useToast } from '../../../../app-core/components/gluestack/toast';
import { CustomToast } from '../../../../app-core/components/toasts/CustomToast';
import { disabledSolidButtonClassnames } from '../../../../app-core/constants/button.constants';
import { text } from '../../../../app-core/intl/en';
import { useAuthContext } from '../../../../authentication/state/AuthProvider';
import { useCardsContext } from '../../../../cards/state/CardsProvider';
import { useRoomContext } from '../../../../rooms/state/RoomProvider';
import { useSocketContext } from '../../../../websockets/SocketProvider';
import { useMeldCard } from '../../../hooks/useMeldCard';
import { useUserPlayerGameData } from '../../../hooks/useUserPlayerGameData';
import { useGameContext } from '../../../state/GameProvider';

import { GameActionSheet } from './GameActionSheet';

export interface IRoomCardMeldedCallbackProps {
  cardName: string;
  meldedBy: { username: string; userId: string };
}

export const MeldAction = () => {
  const { user } = useAuthContext();
  const { cards } = useCardsContext();
  const { currentRoomId } = useRoomContext();
  const { metadata: gameMetadata } = useGameContext();
  const { metadata: playerMetadata, playerId } = useUserPlayerGameData() ?? {};
  // TODO: handle any error melding
  const { loading: meldingInProgress, meldCardFromHand } = useMeldCard();
  const { socket } = useSocketContext();
  const toast = useToast();
  const [showMeldOptions, setShowMeldOptions] = useState(false);

  const possibleActions = playerMetadata?.possibleActions;

  useEffect(() => {
    socket?.on(
      SocketEvent.ROOM_STARTER_CARD_MELDED,
      ({ cardName, meldedBy }: IRoomCardMeldedCallbackProps) => {
        if (user?._id && user._id !== meldedBy.userId) {
          toast.show({
            placement: 'top',
            render: ({ id }) => (
              <CustomToast
                id={id}
                title="Card Melded"
                description={`${meldedBy.username} melded ${cardName}`}
              />
            ),
          });
        }
      }
    );
    return () => {
      socket?.removeListener(SocketEvent.ROOM_STARTER_CARD_MELDED);
    };
  }, [socket]);

  const closeMeldOptions = useCallback(() => {
    setShowMeldOptions(false);
  }, []);

  const emitCardMeldedEvent = (cardId: string) => {
    if (!socket || !cards) {
      return;
    }
    const cardName = cards[cardId].name;
    socket.emit(SocketEvent.PLAYER_MELDED_CARD, { cardName, roomId: currentRoomId });
  };

  const handleMeldSelection = (cardId: string) => {
    setShowMeldOptions(false);
    meldCardFromHand({
      cardId,
      countAsAction: true,
      onSuccess: () => emitCardMeldedEvent(cardId),
    });
  };

  if (!gameMetadata || gameMetadata.currentPlayerId !== playerId || !possibleActions) {
    return null;
  }

  const possibleCardsToMeld = useMemo(() => {
    return playerMetadata.possibleActions.meld.map((cid) => cards[cid]);
  }, [cards, playerMetadata?.possibleActions?.meld]);

  const isMeldDisabled = !possibleActions.meld.length || meldingInProgress;

  return (
    <>
      <Button
        className={isMeldDisabled ? disabledSolidButtonClassnames.button : ''}
        disabled={isMeldDisabled}
        onPress={() => setShowMeldOptions(true)}
      >
        <ButtonText className={isMeldDisabled ? disabledSolidButtonClassnames.buttonText : ''}>
          {text.availableActions.MELD_CTA}
        </ButtonText>
      </Button>
      <GameActionSheet
        cards={possibleCardsToMeld}
        headerText={text.availableActions.CHOOSE_CARD_TO_MELD}
        onClose={closeMeldOptions}
        onSelect={handleMeldSelection}
        visible={showMeldOptions}
      />
    </>
  );
};
