import { useCallback, useEffect } from 'react';

import { Age, SocketEvent } from '@inno/constants';

import { useToast } from '../../../../app-core/components/gluestack/toast';
import { CustomToast } from '../../../../app-core/components/toasts/CustomToast';
import { useSocketContext } from '../../../../websockets/SocketProvider';

export interface IRoomCardDrawnCallbackProps {
  cardAge: Age;
  drawnBy: { username: string; userId: string };
}

export const useActiveGameSocketListeners = () => {
  const { socket } = useSocketContext();
  const toast = useToast();
  const onCardDrawn = useCallback(({ cardAge, drawnBy }: IRoomCardDrawnCallbackProps) => {
    toast.show({
      placement: 'top',
      render: ({ id }) => (
        <CustomToast
          id={id}
          title="Card Drawn"
          description={`${drawnBy.username} drew from the ${cardAge} age`}
        />
      ),
    });
  }, []);

  useEffect(() => {
    socket?.on(SocketEvent.ROOM_CARD_DRAWN, onCardDrawn);
    return () => {
      socket?.removeListener(SocketEvent.ROOM_CARD_DRAWN, onCardDrawn);
    };
  }, [onCardDrawn, socket]);
};
