import { Age, SocketEvent } from '@inno/constants';

import { Button, ButtonText } from '../../../../app-core/components/gluestack/button';
import { disabledSolidButtonClassnames } from '../../../../app-core/constants/button.constants';
import { text } from '../../../../app-core/intl/en';
import { useRoomContext } from '../../../../rooms/state/RoomProvider';
import { useSocketContext } from '../../../../websockets/SocketProvider';
import { useDrawCard } from '../../../hooks/useDrawCard';
import { useUserPlayerGameData } from '../../../hooks/useUserPlayerGameData';
import { useGameContext } from '../../../state/GameProvider';

export const DrawAction = () => {
  // TODO: handle any error
  const { loading: drawInProgress, drawCardAction } = useDrawCard();
  const { metadata: gameMetadata } = useGameContext();
  const { currentRoomId } = useRoomContext();
  const { socket } = useSocketContext();
  const { metadata: playerMetadata, playerId } = useUserPlayerGameData() ?? {};

  const possibleActions = playerMetadata?.possibleActions;

  const emitCardDrawnEvent = (ageDrawn: Age) => {
    if (!socket || !ageDrawn) {
      return;
    }
    socket.emit(SocketEvent.PLAYER_DREW_CARD, { cardAge: ageDrawn, roomId: currentRoomId });
  };

  const handleDraw = () => {
    drawCardAction({
      onSuccess: emitCardDrawnEvent,
    });
  };

  if (!gameMetadata || gameMetadata.currentPlayerId !== playerId || !possibleActions) {
    return null;
  }

  const isDrawDisabled = !possibleActions.draw || drawInProgress;

  return (
    <Button
      className={isDrawDisabled ? disabledSolidButtonClassnames.button : ''}
      disabled={isDrawDisabled}
      onPress={handleDraw}
    >
      <ButtonText className={isDrawDisabled ? disabledSolidButtonClassnames.buttonText : ''}>
        {text.availableActions.DRAW_CTA}
      </ButtonText>
    </Button>
  );
};
