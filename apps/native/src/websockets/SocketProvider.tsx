import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Socket, io } from 'socket.io-client';

import { SocketEvent } from '@inno/constants';

import { WEBSOCKET_API } from '../app-core/constants/manifest';
import { StorageKeys } from '../app-core/constants/storage.constants';

export type TSocketContext = {
  socket?: Socket;
  connectUserToSocket: (token: string, forceConnect: boolean) => void;
  disconnectUserFromSocket: () => void;
};

const SocketContext = createContext<TSocketContext | null>(null);

export function useSocketContext() {
  const value = useContext(SocketContext);
  if (!value) {
    throw new Error('useSocketContext must be wrapped in a <SocketProvider />');
  }
  return value;
}

export function SocketProvider(props: PropsWithChildren) {
  const { getItem: getAuthToken } = useAsyncStorage(StorageKeys.AUTH_TOKEN);
  const [socket, setSocket] = useState<Socket>();

  const connectUserToSocket = useCallback(
    async (token: string, forceConnect: boolean = false) => {
      if (!socket || forceConnect) {
        if (socket && forceConnect) {
          disconnectUserFromSocket();
        }
        const newSocket = io(WEBSOCKET_API, {
          auth: {
            token,
          },
        });
        setSocket(newSocket);
        // enable BE to map user to socketId
        newSocket.emit(SocketEvent.MAP_USER_TO_SOCKET);
      }
    },
    [socket]
  );

  const disconnectUserFromSocket = useCallback(() => {
    socket?.disconnect();
    socket?.removeAllListeners();
  }, []);

  useEffect(() => {
    const trySocketConnection = async () => {
      const token = await getAuthToken();
      if (token) {
        connectUserToSocket(token);
      }
    };
    trySocketConnection();
    return () => {
      disconnectUserFromSocket();
    };
  }, []);

  useEffect(() => {
    socket?.on('connect', () => {
      console.log('SOCKET CONNECTED');
    });
    socket?.on('disconnect', () => {
      console.log('SOCKET DISCONNECTED');
      setSocket(undefined);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connectUserToSocket,
        disconnectUserFromSocket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}
