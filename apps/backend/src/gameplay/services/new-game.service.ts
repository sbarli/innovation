import { Injectable } from '@nestjs/common';
import * as schema from '@inno/db-schema';
import type { AgeAchievements, Board, ColorPile, Deck, TypedCard } from '@inno/db-schema';
import { Color } from '@inno/constants';
import { shuffleArray } from '@inno/utils';
import { DbService } from '../../db/db.service';
import { CardsService } from '../../cards/cards.service';
import type { FullGameState } from '../../games/games.service';
import { GamesService } from '../../games/games.service';

@Injectable()
export class NewGameService {
  constructor(
    private readonly dbService: DbService,
    private readonly cardsService: CardsService,
    private readonly gamesService: GamesService,
  ) {}

  async createGame(roomId: string, playerIds: [string, string]): Promise<FullGameState> {
    const allCards = await this.cardsService.findAll();
    const deck = this.initializeDeck(allCards);
    const ageAchievements = this.selectAgeAchievements(deck);
    const { deck: updatedDeck, hands } = this.dealStarterHands(deck, playerIds);

    const gameId = await this.dbService.withInnoRole(async (tx) => {
      const emptyBoard = this.emptyBoard();
      const [game] = await tx
        .insert(schema.games)
        .values({
          roomId,
          stage: 'active',
          currentPlayerId: playerIds[0],
          currentActionNumber: 1,
          deck: updatedDeck as unknown as typeof schema.games.$inferInsert['deck'],
          ageAchievements: ageAchievements as unknown as typeof schema.games.$inferInsert['ageAchievements'],
        })
        .returning({ id: schema.games.id });

      for (const playerId of playerIds) {
        await tx.insert(schema.playerGameDetails).values({
          gameId: game.id,
          playerId,
          board: emptyBoard as unknown as typeof schema.playerGameDetails.$inferInsert['board'],
          hand: hands[playerId] ?? [],
        });
      }

      return game.id;
    });

    const state = await this.gamesService.findByIdOrThrow(gameId);
    return state;
  }

  private initializeDeck(allCards: TypedCard[]): Deck {
    const byAge: Record<number, string[]> = {};
    for (const card of allCards) {
      if (!byAge[card.age]) byAge[card.age] = [];
      byAge[card.age].push(card.cardId);
    }
    const deck: Deck = {};
    for (const [age, cardIds] of Object.entries(byAge)) {
      deck[age] = shuffleArray(cardIds);
    }
    return deck;
  }

  private selectAgeAchievements(deck: Deck): AgeAchievements {
    const achievements: AgeAchievements = {};
    for (let age = 1; age <= 9; age++) {
      const pile = deck[String(age)];
      if (pile && pile.length > 0) {
        achievements[String(age)] = pile[0];
        deck[String(age)] = pile.slice(1);
      } else {
        achievements[String(age)] = null;
      }
    }
    return achievements;
  }

  private dealStarterHands(
    deck: Deck,
    playerIds: [string, string],
  ): { deck: Deck; hands: Record<string, string[]> } {
    const hands: Record<string, string[]> = { [playerIds[0]]: [], [playerIds[1]]: [] };
    const age1Pile = [...(deck['1'] ?? [])];

    for (const playerId of playerIds) {
      for (let i = 0; i < 2; i++) {
        const card = age1Pile.shift();
        if (card) hands[playerId].push(card);
      }
    }

    deck['1'] = age1Pile;
    return { deck, hands };
  }

  private emptyBoard(): Board {
    const emptyPile = (): ColorPile => ({ cards: [], splay: null });
    return {
      [Color.BLUE]: emptyPile(),
      [Color.GREEN]: emptyPile(),
      [Color.PURPLE]: emptyPile(),
      [Color.RED]: emptyPile(),
      [Color.YELLOW]: emptyPile(),
    };
  }
}
