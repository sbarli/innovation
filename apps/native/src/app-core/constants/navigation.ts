export enum Routes {
  AUTH = '/auth',
  CREATE_ROOM = '/create-room',
  EXAMPLES = '/examples',
  GAME = '/rooms/[roomId]/games/[gameId]',
  HOME = '/',
  LOGOUT = '/logout',
  ROOM = '/rooms/[roomId]',
}

export enum AuthRouteParams {
  LOGIN = 'login',
  SIGNUP = 'signup',
}
