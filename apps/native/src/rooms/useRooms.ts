import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const result = await api.rooms.getRoomsForPlayer({});
      if (result.status !== 200) throw new Error('Failed to fetch rooms');
      return result.body;
    },
  });
}

export function useRoom(roomId: string) {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: async () => {
      const result = await api.rooms.getRoom({ params: { roomId } });
      if (result.status !== 200) throw new Error('Room not found');
      return result.body;
    },
    enabled: !!roomId,
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const result = await api.rooms.createRoom({ body: { name } });
      if (result.status !== 201) throw new Error('Failed to create room');
      return result.body;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rooms'] }),
  });
}

export function useJoinRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomId }: { roomId: string }) => {
      const result = await api.rooms.joinRoom({ params: { roomId }, body: {} });
      if (result.status !== 200) {
        const body = result.body as { message?: string };
        throw new Error(body?.message ?? 'Failed to join room');
      }
      return result.body;
    },
    onSuccess: (_data, { roomId }) => {
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}
