import { Injectable } from '@nestjs/common';

import { GameStage } from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

import { CardRefsByAge } from 'src/cards/dto/card-refs-by-age.dto';
import { GamesService } from 'src/games/games.service';
import { AgeAchievements } from 'src/games/schemas/age-achievements.schema';
import { Deck } from 'src/games/schemas/deck.schema';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';

import { CreateGameInput } from '../../games/schemas/game.schema';
import { CreateNewGameResponse } from '../dto/create-new-game.output.dto';
import { createBaseBoard } from '../helpers/board';
import {
  TPlayerStarterHands,
  pickAgeAchievements,
  selectStarterHandsForPlayers,
  shuffleDeck,
} from '../helpers/new-game';

export type TNewGameSetup = {
  deck: Deck;
  ageAchievements: AgeAchievements;
  playerStarterHands: TPlayerStarterHands;
};

interface IStartGameProps {
  roomRef: string;
  playerRefs: string[];
  starterDeck: Deck;
  ageAchievements: AgeAchievements;
  playerStarterHands: TPlayerStarterHands;
}

@Injectable()
export class NewGameService {
  constructor(
    private playerGameDetailsService: PlayerGameDetailsService,
    private gamesService: GamesService
  ) {}

  getGameSetup(cardRefsByAge: CardRefsByAge, playerRefs: string[]): TNewGameSetup {
    // create starter deck (shuffle each age)
    const starterDeck = shuffleDeck(cardRefsByAge);

    // select age Achievements (remove from starter deck)
    const { ageAchievements, deckMinusAchievements } = pickAgeAchievements(starterDeck);

    // select player starting hands (2 cards x n players) (remove from current deck)
    const { playerStarterHands, deckMinusStarterHands } = selectStarterHandsForPlayers(
      deckMinusAchievements,
      playerRefs
    );

    return {
      deck: deckMinusStarterHands,
      ageAchievements: ageAchievements,
      playerStarterHands,
    };
  }

  async newGame({
    roomRef,
    playerRefs,
    starterDeck,
    ageAchievements,
    playerStarterHands,
  }: IStartGameProps): Promise<CreateNewGameResponse> {
    try {
      // create game
      const newGameData: CreateGameInput = {
        roomRef,
        currentActionNumber: 2,
        currentPlayerRef: playerRefs[0],
        stage: GameStage.SETUP,
        playerRefs,
        deck: starterDeck,
        ageAchievements: ageAchievements,
      };
      const newGameFromDb = await this.gamesService.create(newGameData);

      // // create player game details
      const playerGameDetailsData: Omit<PlayerGameDetails, '_id'>[] = playerRefs.map((ref) => ({
        playerRef: ref,
        gameRef: newGameFromDb._id,
        board: createBaseBoard(),
        ageAchievements: [],
        hand: playerStarterHands[ref],
        scorePile: [],
        specialAchievements: [],
      }));
      // TODO: do we need to have any other checks that this was successful?
      await Promise.all(
        playerGameDetailsData.map((pgd) => this.playerGameDetailsService.create(pgd))
      );

      // return newly created game and game details (per player)
      return {
        gameId: newGameFromDb._id,
      };
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ?? 'newGameService.startGame: Unable to start game'
      );
    }
  }
}
