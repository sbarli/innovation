import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as schema from '@inno/db-schema';
import { sql } from 'drizzle-orm';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres, { type Sql } from 'postgres';

export type InnoDb = PostgresJsDatabase<typeof schema>;

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private pg!: Sql;
  db!: InnoDb;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const url = this.configService.get<string>('DATABASE_URL');
    if (!url) throw new Error('DATABASE_URL is not set');
    this.pg = postgres(url);
    this.db = drizzle(this.pg, { schema });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pg.end();
  }

  async withInnoRole<T>(fn: (tx: InnoDb) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => {
      await tx.execute(sql`SET LOCAL "request.jwt.claims" = '{"backend_service":"inno-backend"}'`);
      return fn(tx as unknown as InnoDb);
    });
  }
}
