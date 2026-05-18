import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { TypedGame, TypedPlayerGameDetails } from '@inno/db-schema';
import { AgeAchievementCost, GameStage } from '@inno/constants';
import type { FullGameState } from '../../games/games.service';

@Injectable()
export class ValidationService {
  validateIsCurrentPlayer(game: TypedGame, userId: string): void {
    if (game.currentPlayerId !== userId) {
      throw new ForbiddenException('It is not your turn');
    }
  }

  validateGameStage(game: TypedGame, expectedStage: GameStage): void {
    if (game.stage !== expectedStage) {
      throw new BadRequestException(`Game is not in ${expectedStage} stage`);
    }
  }

  validateCardInHand(playerDetails: TypedPlayerGameDetails, cardId: string): void {
    if (!playerDetails.hand.includes(cardId)) {
      throw new BadRequestException(`Card ${cardId} is not in your hand`);
    }
  }

  validateAchievementEligibility(
    game: TypedGame,
    playerDetails: TypedPlayerGameDetails,
    achievementAge: number,
  ): void {
    const costToAchieve = (AgeAchievementCost as unknown as Record<number, number | undefined>)[achievementAge];

    if (costToAchieve === undefined) {
      throw new BadRequestException(`Invalid achievement age: ${achievementAge}`);
    }

    const scoreCount = playerDetails.scorePile.length;
    if (scoreCount < costToAchieve) {
      throw new BadRequestException(
        `Need ${costToAchieve} score cards to achieve age ${achievementAge}, you have ${scoreCount}`,
      );
    }

    if (game.ageAchievements[String(achievementAge)] === null) {
      throw new BadRequestException(`Age ${achievementAge} achievement has already been claimed`);
    }

    const hasTopCard = Object.values(playerDetails.board).some(
      (pile) => pile.cards.length > 0,
    );
    if (!hasTopCard) {
      throw new BadRequestException('You have no cards on your board');
    }
  }

  validateGameExists(state: FullGameState | null): asserts state is FullGameState {
    if (!state) throw new NotFoundException('Game not found');
  }
}
