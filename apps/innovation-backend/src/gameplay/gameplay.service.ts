import { Injectable } from '@nestjs/common';
import { NewGameDto } from './dto/new-game.dto';
import { Game } from 'src/games/schemas/game.schema';
import { PlayerGameDetails } from 'src/player-game-details/schemas/player-game-details.schema';
import { PlayersService } from 'src/players/players.service';
import { CardsService } from 'src/cards/cards.service';
import {
  AgeString,
  ages,
  cardAgeToAgeStringMap,
} from 'src/shared/constants/cards';
import { Deck } from 'src/games/schemas/deck.schema';
import { shuffleArray } from 'src/shared/utils/shuffle-array';
import { Achievements } from 'src/games/schemas/achievements.schema';
// import { ResourceTotals } from 'src/shared/schemas/resource-totals.schema';
import { GamesService } from 'src/games/games.service';
import { Player } from 'src/players/schemas/player.schema';

type NewGameDetails = {
  game: Game;
  playerGameDetails: PlayerGameDetails[];
};

@Injectable()
export class GameplayService {
  constructor(
    private playersService: PlayersService,
    private cardsService: CardsService,
    private gamesService: GamesService,
  ) {}

  async newGame(newGameDto: NewGameDto): Promise<NewGameDetails> {
    try {
      // verify  players exist
      const players = await Promise.all(
        newGameDto.playerIds.map((playerId) =>
          this.playersService.findPlayerByPlayerId(playerId),
        ),
      );
      const actualPlayers: Player[] = [];
      players.forEach((player) => {
        if (player?._id) {
          actualPlayers.push(player);
        }
      });

      // TODO: check if there is an existing game for these players
      // DO NOT create a new game - return error with message

      // get all cards by age
      const allCardData = await this.cardsService.findAll();
      const cardIdsByAge = allCardData.reduce(
        (acc, card) => {
          acc[cardAgeToAgeStringMap[card.age] as AgeString].push(card._id);
          return acc;
        },
        {
          [AgeString.ONE]: [] as string[],
          [AgeString.TWO]: [] as string[],
          [AgeString.THREE]: [] as string[],
          [AgeString.FOUR]: [] as string[],
          [AgeString.FIVE]: [] as string[],
          [AgeString.SIX]: [] as string[],
          [AgeString.SEVEN]: [] as string[],
          [AgeString.EIGHT]: [] as string[],
          [AgeString.NINE]: [] as string[],
          [AgeString.TEN]: [] as string[],
        },
      );
      // shuffle cards into starter deck
      const starterDeck = Object.keys(cardIdsByAge).reduce((acc, ageString) => {
        const age = ageString as AgeString;
        acc[age] = shuffleArray(cardIdsByAge[age]);
        return acc;
      }, {} as Deck);
      // select age achievements
      const ageAchievements = ages.reduce((acc, age) => {
        if (age !== AgeString.TEN) {
          const cardId = starterDeck[age].shift();
          if (!cardId) {
            throw new Error('Missing cardId for age achievements draw');
          }
          acc[age] = cardId;
        }
        return acc;
      }, {} as Achievements);
      // select player starting hands (2 cards x n players)
      const playerStarterHands = actualPlayers.reduce((acc, player) => {
        acc[player._id.toString()] = [];
        return acc;
      }, {} as { [key: string]: string[] });
      for (let i = 0; i < 2; i++) {
        Object.keys(playerStarterHands).forEach((playerId) => {
          const cardId = starterDeck[AgeString.ONE].shift();
          if (!cardId) {
            throw new Error('Missing cardId for starter hands draw');
          }
          playerStarterHands[playerId].push(cardId);
        });
      }
      // create game
      const newGameData = {
        currentActionNumber: 2,
        currentPlayerRef: actualPlayers[0]._id,
        playerRefs: actualPlayers.map((player) => player._id),
        deck: starterDeck,
        achievements: ageAchievements,
      };
      // create player game details
      const playerGameDetailsData = players.map((player) => {
        return {
          age: 1,
          score: 0,
          // TODO: calculate this
          // resourceTotals: {} as ResourceTotals,
          // TODO: create starter board
          // board: Board,
          achievements: [],
          hand: playerStarterHands[player?._id.toString() ?? ''],
          scoreCardRefs: [],
          // TODO: add once we have spec achiev added to schema
          // specialAchievements: [],
        };
      }) as unknown as PlayerGameDetails[];
      // save new game and new player game details to DB
      const newGameFromDb = await this.gamesService.create(newGameData);
      console.log('newGameFromDb: ', newGameFromDb);
      console.log('playerGameDetailsData: ', playerGameDetailsData);

      // return newly created game and game details (per player)
      return {
        game: {} as Game,
        playerGameDetails: playerGameDetailsData,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
