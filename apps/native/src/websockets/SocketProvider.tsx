import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { SocketEvent } from '@inno/constants';
import { useSupabase } from '../supabase/SupabaseProvider';

interface SocketContextValue {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextValue>({ socket: null, connected: false });

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { session } = useSupabase();
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!session?.access_token) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setConnected(false);
      return;
    }

    const socket = io(process.env['EXPO_PUBLIC_WEBSOCKET_URL'] ?? 'http://localhost:8080', {
      auth: { token: session.access_token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      setConnected(true);
      socket.emit(SocketEvent.MAP_USER_TO_SOCKET);
    });

    socket.on('disconnect', () => setConnected(false));

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [session?.access_token]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
