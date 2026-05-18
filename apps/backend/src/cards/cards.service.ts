import { Injectable } from '@nestjs/common';
import * as schema from '@inno/db-schema';
import type { TypedCard } from '@inno/db-schema';
import { eq, inArray } from 'drizzle-orm';
import { DbService } from '../db/db.service';

@Injectable()
export class CardsService {
  constructor(private readonly dbService: DbService) {}

  private toTyped(card: typeof schema.cards.$inferSelect): TypedCard {
    return card as unknown as TypedCard;
  }

  async findAll(): Promise<TypedCard[]> {
    return this.dbService.withInnoRole(async (tx) => {
      const rows = await tx.select().from(schema.cards);
      return rows.map(this.toTyped);
    });
  }

  async findByCardId(cardId: string): Promise<TypedCard | null> {
    return this.dbService.withInnoRole(async (tx) => {
      const [card] = await tx
        .select()
        .from(schema.cards)
        .where(eq(schema.cards.cardId, cardId))
        .limit(1);
      return card ? this.toTyped(card) : null;
    });
  }

  async findByCardIds(cardIds: string[]): Promise<TypedCard[]> {
    if (cardIds.length === 0) return [];
    return this.dbService.withInnoRole(async (tx) => {
      const rows = await tx
        .select()
        .from(schema.cards)
        .where(inArray(schema.cards.cardId, cardIds));
      return rows.map(this.toTyped);
    });
  }

  async findByAge(age: number): Promise<TypedCard[]> {
    return this.dbService.withInnoRole(async (tx) => {
      const rows = await tx
        .select()
        .from(schema.cards)
        .where(eq(schema.cards.age, age));
      return rows.map(this.toTyped);
    });
  }
}
