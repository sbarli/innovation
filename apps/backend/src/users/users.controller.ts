import { Controller, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@inno/api-contracts';
import { AuthUser, CurrentUser } from '../auth/decorators/current-user.decorator';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { UsersService } from './users.service';

@Controller()
@UseGuards(SupabaseAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TsRestHandler(contract.users.createProfile)
  async createProfile(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.users.createProfile, async ({ body }) => {
      const profile = await this.usersService.createProfile(user.userId, body.username);
      return { status: 201 as const, body: { ...profile, createdAt: profile.createdAt.toISOString() } };
    });
  }

  @TsRestHandler(contract.users.getMe)
  async getMe(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.users.getMe, async () => {
      const profile = await this.usersService.findByIdOrThrow(user.userId);
      return { status: 200 as const, body: { ...profile, createdAt: profile.createdAt.toISOString() } };
    });
  }
}
