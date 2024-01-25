import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAuthHeaderFromWSHandshake = (handshake: any) => {
  // For use with Postman
  if (handshake?.headers?.authorization) {
    return {
      authorization: handshake.headers.authorization,
    };
  }
  // For use with RN/Web clients (per socket-io client API docs)
  if (handshake?.auth?.token) {
    return {
      authorization: `Bearer ${handshake.auth.token}`,
    };
  }
  // Default to bad auth state
  return {
    authorization: undefined,
  };
};

@Injectable()
export class JwtWsAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ws = context.switchToWs().getClient();
    const authHeader = getAuthHeaderFromWSHandshake(ws.handshake);
    if (!authHeader.authorization) {
      throw new WsException('Unauthorized');
    }
    const ctx = context.switchToHttp().getRequest();
    ctx.headers = { ...ctx.headers, ...authHeader };
    return ctx;
  }
}
