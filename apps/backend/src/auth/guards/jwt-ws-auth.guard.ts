import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAuthHeaderFromWSHandshake = (handshake: any) => {
  // For use with Postman
  if (handshake?.headers?.authorization) {
    return {
      headers: {
        authorization: handshake.headers.authorization,
      },
    };
  }
  // For use with RN/Web clients (per socket-io client API docs)
  if (handshake?.auth?.token) {
    return {
      headers: {
        authorization: `Bearer ${handshake.auth.token}`,
      },
    };
  }
  // Default to bad auth state
  return {
    headers: {
      authorization: undefined,
    },
  };
};

export class JwtWsAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ws = context.switchToWs().getClient(); // possibly `getData()` instead.
    const authHeader = getAuthHeaderFromWSHandshake(ws.handshake);
    console.log('authHeader: ', authHeader);
    return authHeader;
  }
}
