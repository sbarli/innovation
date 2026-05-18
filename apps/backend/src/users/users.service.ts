import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '@inno/db-schema';
import type { User } from '@inno/db-schema';
import { eq } from 'drizzle-orm';
import { DbService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async createProfile(supabaseUserId: string, username: string): Promise<User> {
    return this.dbService.withInnoRole(async (tx) => {
      const existing = await tx
        .select()
        .from(schema.users)
        .where(eq(schema.users.username, username))
        .limit(1);

      if (existing.length > 0) {
        throw new ConflictException(`Username "${username}" is already taken`);
      }

      const [user] = await tx
        .insert(schema.users)
        .values({ id: supabaseUserId, username })
        .returning();

      return user;
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.dbService.withInnoRole(async (tx) => {
      const [user] = await tx
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .limit(1);
      return user ?? null;
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.dbService.withInnoRole(async (tx) => {
      const [user] = await tx
        .select()
        .from(schema.users)
        .where(eq(schema.users.username, username))
        .limit(1);
      return user ?? null;
    });
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
}
