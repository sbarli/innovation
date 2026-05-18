import { Module } from '@nestjs/common';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';
import { WsAuthGuard } from './guards/ws-auth.guard';

@Module({
  providers: [SupabaseAuthGuard, WsAuthGuard],
  exports: [SupabaseAuthGuard, WsAuthGuard],
})
export class AuthModule {}
