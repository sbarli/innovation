import { io } from 'socket.io-client';

import { WEBSOCKET_API } from '../app-core/constants/manifest';

export const socket = io(WEBSOCKET_API);

socket.on('connect', () => {
  console.log(`SOCKET CONNECTED: ${socket.id}`);
});

socket.on('disconnect', () => {
  console.log('SOCKET DISCONNECTED');
});
