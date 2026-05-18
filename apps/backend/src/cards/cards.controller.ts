import { Controller, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@inno/api-contracts';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { CardsService } from './cards.service';

@Controller()
@UseGuards(SupabaseAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @TsRestHandler(contract.cards.getCards)
  async getCards() {
    return tsRestHandler(contract.cards.getCards, async () => {
      const cards = await this.cardsService.findAll();
      return { status: 200 as const, body: cards.map(serializeCard) };
    });
  }

  @TsRestHandler(contract.cards.getCard)
  async getCard() {
    return tsRestHandler(contract.cards.getCard, async ({ params }) => {
      const card = await this.cardsService.findByCardId(params.cardId);
      if (!card) return { status: 404 as const, body: { message: 'Card not found' } };
      return { status: 200 as const, body: serializeCard(card) };
    });
  }
}

function serializeCard(card: { id: string; cardId: string; name: string; age: number; color: string; dogmaResource: string; resourceTotals: unknown; resourceSpaces: unknown; dogmaEffects: unknown }) {
  return {
    id: card.id,
    cardId: card.cardId,
    name: card.name,
    age: card.age,
    color: card.color,
    dogmaResource: card.dogmaResource,
    resourceTotals: card.resourceTotals as Record<string, number>,
    resourceSpaces: card.resourceSpaces as { resourceSpace1: string | null; resourceSpace2: string | null; resourceSpace3: string | null; resourceSpace4: string | null },
    dogmaEffects: card.dogmaEffects as Array<{ description: string; effectTypes: string[]; isDemand: boolean; isOptional: boolean; repeat: boolean; specialAchievement: string | null }>,
  };
}
