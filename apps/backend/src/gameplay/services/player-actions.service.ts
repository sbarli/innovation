import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as schema from '@inno/db-schema';
import type { Deck, TypedGame, TypedPlayerGameDetails } from '@inno/db-schema';
import { GameStage } from '@inno/constants';
import { eq } from 'drizzle-orm';
import { DbService, type InnoDb } from '../../db/db.service';
import { CardsService } from '../../cards/cards.service';
import type { FullGameState } from '../../games/games.service';
import { GamesService } from '../../games/games.service';
import { ResourcesService } from './resources.service';
import { ValidationService } from './validation.service';
import { WinnerService } from './winner.service';

@Injectable()
export class PlayerActionsService {
  constructor(
    private readonly dbService: DbService,
    private readonly cardsService: CardsService,
    private readonly gamesService: GamesService,
    private readonly resourcesService: ResourcesService,
    private readonly validationService: ValidationService,
    private readonly winnerService: WinnerService,
  ) {}

  async draw(gameId: string, playerId: string): Promise<FullGameState> {
    const state = await this.gamesService.findByIdOrThrow(gameId);
    this.validationService.validateGameStage(state.game, GameStage.ACTIVE);
    this.validationService.validateIsCurrentPlayer(state.game, playerId);

    const myDetails = this.getMyDetails(state, playerId);
    const allCards = await this.cardsService.findAll();
    const cardMap = new Map(allCards.map((c) => [c.cardId, c]));

    const boardAge = this.resourcesService.getHighestBoardAge(myDetails.board, cardMap);
    const drawAge = boardAge === 0 ? 1 : boardAge;

    await this.dbService.withInnoRole(async (tx) => {
      const { cardId, deck } = this.popFromDeck(state.game.deck, drawAge);

      if (!cardId) {
        throw new BadRequestException('No cards available to draw');
      }

      await tx
        .update(schema.games)
        .set({ deck: deck as unknown as typeof schema.games.$inferInsert['deck'] })
        .where(eq(schema.games.id, gameId));

      await tx
        .update(schema.playerGameDetails)
        .set({ hand: [...myDetails.hand, cardId] })
        .where(eq(schema.playerGameDetails.id, myDetails.id));

      await this.advanceAction(tx, state.game, state.playerDetails.map((p) => p.playerId));
    });

    return this.gamesService.findByIdOrThrow(gameId);
  }

  async meld(gameId: string, playerId: string, cardId: string): Promise<FullGameState> {
    const state = await this.gamesService.findByIdOrThrow(gameId);
    this.validationService.validateGameStage(state.game, GameStage.ACTIVE);
    this.validationService.validateIsCurrentPlayer(state.game, playerId);

    const myDetails = this.getMyDetails(state, playerId);
    this.validationService.validateCardInHand(myDetails, cardId);

    const card = await this.cardsService.findByCardId(cardId);
    if (!card) throw new BadRequestException(`Card ${cardId} not found`);

    await this.dbService.withInnoRole(async (tx) => {
      const newHand = myDetails.hand.filter((id) => id !== cardId);
      const pile = myDetails.board[card.color as keyof typeof myDetails.board];
      const newBoard = {
        ...myDetails.board,
        [card.color]: { ...pile, cards: [cardId, ...pile.cards] },
      };

      await tx
        .update(schema.playerGameDetails)
        .set({
          hand: newHand,
          board: newBoard as unknown as typeof schema.playerGameDetails.$inferInsert['board'],
        })
        .where(eq(schema.playerGameDetails.id, myDetails.id));

      await this.advanceAction(tx, state.game, state.playerDetails.map((p) => p.playerId));
    });

    return this.gamesService.findByIdOrThrow(gameId);
  }

  async achieve(gameId: string, playerId: string, achievementAge: number): Promise<FullGameState> {
    const state = await this.gamesService.findByIdOrThrow(gameId);
    this.validationService.validateGameStage(state.game, GameStage.ACTIVE);
    this.validationService.validateIsCurrentPlayer(state.game, playerId);

    const myDetails = this.getMyDetails(state, playerId);
    this.validationService.validateAchievementEligibility(state.game, myDetails, achievementAge);

    await this.dbService.withInnoRole(async (tx) => {
      const newAgeAchievements = [...myDetails.ageAchievements, String(achievementAge)];
      const newGameAchievements = {
        ...state.game.ageAchievements,
        [String(achievementAge)]: null,
      };

      await tx
        .update(schema.playerGameDetails)
        .set({ ageAchievements: newAgeAchievements })
        .where(eq(schema.playerGameDetails.id, myDetails.id));

      await tx
        .update(schema.games)
        .set({ ageAchievements: newGameAchievements as unknown as typeof schema.games.$inferInsert['ageAchievements'] })
        .where(eq(schema.games.id, gameId));

      // Check win condition
      const winnerId = this.winnerService.checkAchievementWin({
        game: state.game,
        playerDetails: state.playerDetails.map((pd) =>
          pd.playerId === playerId
            ? { ...pd, ageAchievements: newAgeAchievements }
            : pd,
        ),
      });

      if (winnerId) {
        await tx
          .update(schema.games)
          .set({ stage: GameStage.COMPLETE, winnerId })
          .where(eq(schema.games.id, gameId));
      } else {
        await this.advanceAction(tx, state.game, state.playerDetails.map((p) => p.playerId));
      }
    });

    return this.gamesService.findByIdOrThrow(gameId);
  }

  private getMyDetails(state: FullGameState, playerId: string): TypedPlayerGameDetails {
    const details = state.playerDetails.find((pd) => pd.playerId === playerId);
    if (!details) throw new BadRequestException('Player not in game');
    return details;
  }

  private popFromDeck(deck: Deck, startAge: number): { cardId: string | null; deck: Deck } {
    for (let age = startAge; age <= 10; age++) {
      const pile = deck[String(age)];
      if (pile && pile.length > 0) {
        const [cardId, ...remaining] = pile;
        return { cardId, deck: { ...deck, [String(age)]: remaining } };
      }
    }
    return { cardId: null, deck };
  }

  private async advanceAction(
    tx: InnoDb,
    game: TypedGame,
    playerIds: string[],
  ): Promise<void> {
    if (game.currentActionNumber === 1) {
      await tx
        .update(schema.games)
        .set({ currentActionNumber: 2 })
        .where(eq(schema.games.id, game.id));
    } else {
      const currentIndex = playerIds.indexOf(game.currentPlayerId);
      const nextIndex = (currentIndex + 1) % playerIds.length;
      await tx
        .update(schema.games)
        .set({ currentActionNumber: 1, currentPlayerId: playerIds[nextIndex] })
        .where(eq(schema.games.id, game.id));
    }
  }
}
