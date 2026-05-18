import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SocketEvent } from '@inno/constants';
import { api } from '../api/client';
import { useSocket } from '../websockets/SocketProvider';

export function useGame(gameId: string) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['game', gameId],
    queryFn: async () => {
      const result = await api.gameplay.getGame({ params: { gameId } });
      if (result.status !== 200) throw new Error('Failed to fetch game');
      return result.body;
    },
    enabled: !!gameId,
  });

  useEffect(() => {
    if (!socket) return;
    const handleUpdate = (state: unknown) => {
      queryClient.setQueryData(['game', gameId], state);
    };
    socket.on(SocketEvent.GAME_UPDATED, handleUpdate);
    return () => {
      socket.off(SocketEvent.GAME_UPDATED, handleUpdate);
    };
  }, [socket, gameId, queryClient]);

  return query;
}
