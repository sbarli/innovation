export const Routes = {
  AUTH: {
    path: '/auth',
    name: 'Auth',
  },
  CREATE_ROOM: {
    path: '/create-room',
    name: 'Create Room',
  },
  EXAMPLES: {
    path: '/examples',
    name: 'Examples',
  },
  GAME: {
    path: '/rooms/[roomId]/games/[gameId]',
    name: 'Game',
  },
  HOME: {
    path: '/',
    name: 'Home',
  },
  LOGOUT: {
    path: '/logout',
    name: 'Logout',
  },
  ROOM: {
    path: '/rooms/[roomId]',
    name: 'Room',
  },
  TRAINING: {
    path: '/training',
    name: 'Traiing',
  },
  TRAINING_GAME: {
    path: '/training/game',
    name: 'Game Training',
  },
};

export enum AuthRouteParams {
  LOGIN = 'login',
  SIGNUP = 'signup',
}
