import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import type { Request } from 'express';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.slice(7);
    const secret = this.configService.get<string>('SUPABASE_JWT_SECRET');
    if (!secret) throw new UnauthorizedException('JWT secret not configured');

    try {
      const payload = jwt.verify(token, secret) as jwt.JwtPayload;
      (request as Request & { user: unknown }).user = {
        userId: payload['sub'] as string,
        email: payload['email'] as string,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
