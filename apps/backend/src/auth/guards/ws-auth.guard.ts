import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import type { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.auth?.['token'] as string | undefined;

    if (!token) return false;

    const secret = this.configService.get<string>('SUPABASE_JWT_SECRET');
    if (!secret) return false;

    try {
      const payload = jwt.verify(token, secret) as jwt.JwtPayload;
      client.data['user'] = {
        userId: payload['sub'] as string,
        email: payload['email'] as string,
      };
      return true;
    } catch {
      return false;
    }
  }
}
