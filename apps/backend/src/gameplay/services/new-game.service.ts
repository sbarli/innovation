import { Injectable } from '@nestjs/common';
import { CardRefsByAge } from 'src/cards/dto/card-refs-by-age.dto';
import { GamesService } from 'src/games/games.service';
import { Achievements } from 'src/games/schemas/achievements.schema';
import { Deck } from 'src/games/schemas/deck.schema';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';

import { getCatchErrorMessage } from '@inno/utils';

import { baseResourceTotals } from '../constants/resource-totals';
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
  achievements: Achievements;
  playerStarterHands: TPlayerStarterHands;
};

interface IStartGameProps {
  roomRef: string;
  playerRefs: string[];
  starterDeck: Deck;
  ageAchievements: Achievements;
  playerStarterHands: TPlayerStarterHands;
}

@Injectable()
export class NewGameService {
  constructor(
    private usersService: UsersService,
    private playerGameDetailsService: PlayerGameDetailsService,
    private gamesService: GamesService,
    private roomsService: RoomsService
  ) {}

  async validateRoomExists(roomRef: string): Promise<boolean> {
    try {
      const foundRoom = await this.roomsService.findRoomByRef(roomRef);
      if (!foundRoom) {
        throw new Error('Room not found');
      }
      return true;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ??
          'newGameService.validateRoomExists: Unable to validate room exists'
      );
    }
  }

  async validatePlayersExist(playerRefs: string[]): Promise<boolean> {
    try {
      const foundPlayers = await this.usersService.findUsers({
        searchField: 'ref',
        searchValues: playerRefs,
      });
      if (foundPlayers?.length !== playerRefs.length) {
        throw new Error('One or more players not found');
      }
      return true;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ??
          'newGameService.validatePlayersExist: Unable to validate players exist'
      );
    }
  }

  /**
   * @deprecated
   */
  async validateUniqueGame(playerRefs: string[]): Promise<boolean> {
    try {
      const game = await this.gamesService.findActiveGameByPlayers(playerRefs);
      if (game) {
        throw new Error('Active game already exists for these players');
      }
      return true;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ??
          'newGameService.validateUniqueGame: Unable to validate unique game'
      );
    }
  }

  getGameSetup(cardRefsByAge: CardRefsByAge, playerRefs: string[]): TNewGameSetup {
    // create starter deck (shuffle each age)
    const starterDeck = shuffleDeck(cardRefsByAge);

    // select age achievements (remove from starter deck)
    const { ageAchievements, deckMinusAchievements } = pickAgeAchievements(starterDeck);

    // select player starting hands (2 cards x n players) (remove from current deck)
    const { playerStarterHands, deckMinusStarterHands } = selectStarterHandsForPlayers(
      deckMinusAchievements,
      playerRefs
    );

    return {
      deck: deckMinusStarterHands,
      achievements: ageAchievements,
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
      const newGameData = {
        roomRef,
        currentActionNumber: 2,
        currentPlayerRef: playerRefs[0],
        playerRefs,
        deck: starterDeck,
        achievements: ageAchievements,
      };
      const newGameFromDb = await this.gamesService.create(newGameData);

      // // create player game details
      const playerGameDetailsData: Omit<PlayerGameDetails, '_id'>[] = playerRefs.map((ref) => ({
        playerRef: ref,
        gameRef: newGameFromDb._id,
        age: 1,
        score: 0,
        resourceTotals: { ...baseResourceTotals },
        board: createBaseBoard(),
        achievements: [],
        hand: playerStarterHands[ref],
        scoreCardRefs: [],
        // TODO: add once we have spec achiev added to schema
        // specialAchievements: [],
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
