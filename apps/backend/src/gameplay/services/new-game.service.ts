import { Injectable } from '@nestjs/common';
import { CardRefsByAge } from 'src/cards/dto/card-refs-by-age.dto';
import { GamesService } from 'src/games/games.service';
import { Achievements } from 'src/games/schemas/achievements.schema';
import { Deck } from 'src/games/schemas/deck.schema';
import { Game } from 'src/games/schemas/game.schema';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';
import { PlayersService } from 'src/players/players.service';
import { Player } from 'src/players/schemas/player.schema';

import { getCatchErrorMessage } from '@inno/utils';

import { baseResourceTotals } from '../constants/resource-totals';
import { createBaseBoard } from '../helpers/board';
import {
  TPlayerStarterHands,
  pickAgeAchievements,
  selectStarterHandsForPlayers,
  shuffleDeck,
} from '../helpers/new-game';

type NewGameDetails = {
  game: Game;
  playerGameDetails: PlayerGameDetails[];
};

type TNewGameSetup = {
  deck: Deck;
  achievements: Achievements;
  playerStarterHands: TPlayerStarterHands;
};

interface IStartGameProps {
  playerRefs: string[];
  starterDeck: Deck;
  ageAchievements: Achievements;
  playerStarterHands: TPlayerStarterHands;
}

@Injectable()
export class NewGameService {
  constructor(
    private playersService: PlayersService,
    private playerGameDetailsService: PlayerGameDetailsService,
    private gamesService: GamesService
  ) {}

  async validatePlayersExist(playerRefs: string[]): Promise<Player[]> {
    try {
      const players = await Promise.all(
        playerRefs.map((ref) => this.playersService.findPlayerByRef(ref))
      );
      const actualPlayers: Player[] = [];
      players.forEach((player) => {
        if (player?._id) {
          actualPlayers.push(player);
        }
      });
      if (actualPlayers.length !== playerRefs.length) {
        throw new Error('One or more players not found');
      }
      return actualPlayers;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ??
          'newGameService.validatePlayersExist: Unable to validate players exist'
      );
    }
  }

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

  async startGame({
    playerRefs,
    starterDeck,
    ageAchievements,
    playerStarterHands,
  }: IStartGameProps): Promise<NewGameDetails> {
    try {
      // create game
      const newGameData = {
        currentActionNumber: 2,
        currentPlayerRef: playerRefs[0],
        playerRefs: playerRefs,
        deck: starterDeck,
        achievements: ageAchievements,
      };
      const newGameFromDb = await this.gamesService.create(newGameData);

      if (!newGameFromDb._id) {
        throw new Error('New game created missing _id');
      }

      // // create player game details
      const playerGameDetailsData: Omit<PlayerGameDetails, '_id'>[] = playerRefs.map((ref) => ({
        playerRef: ref,
        gameRef: newGameFromDb?._id ?? '',
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
      const allPlayerGameDetails = await Promise.all(
        playerGameDetailsData.map((pgd) => this.playerGameDetailsService.create(pgd))
      );

      // return newly created game and game details (per player)
      return {
        game: newGameFromDb,
        playerGameDetails: allPlayerGameDetails,
      };
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ?? 'newGameService.startGame: Unable to start game'
      );
    }
  }
}
