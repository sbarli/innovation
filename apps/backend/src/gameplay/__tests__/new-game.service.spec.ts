import { Test } from '@nestjs/testing';
import { MOCK_CARD_REFS_BY_AGE } from 'src/cards/__mocks__/cards-sorting.mock';
import { MOCK_STARTER_ACHIEVEMENTS } from 'src/games/__mocks__/achievements.mock';
import { MOCK_DECK } from 'src/games/__mocks__/deck.mock';
import { MOCK_GAME, MOCK_GAME_INPUT } from 'src/games/__mocks__/game.mock';
import { GamesService } from 'src/games/games.service';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { MOCK_PLAYERS, MOCK_PLAYER_1 } from 'src/players/__mocks__/player.mock';
import { PlayersService } from 'src/players/players.service';

import {
  MOCK_NEW_GAME_RESPONSE,
  MOCK_PLAYER_1_DETAILS,
  MOCK_PLAYER_2_DETAILS,
  MOCK_PLAYER_REFS,
} from '../__mocks__/gameplay.mock';
import { MOCK_PLAYER_STARTER_HANDS } from '../__mocks__/new-game.mock';
import * as helpers from '../helpers/new-game';
import { NewGameService } from '../services/new-game.service';

describe('NewGameService', () => {
  let playersService: PlayersService;
  let playerGameDetailsService: PlayerGameDetailsService;
  let gamesService: GamesService;
  let newGameService: NewGameService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PlayersService,
          useValue: {
            findPlayersByRef: jest.fn(),
          },
        },
        {
          provide: PlayerGameDetailsService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: GamesService,
          useValue: {
            findActiveGameByPlayers: jest.fn(),
            create: jest.fn(),
          },
        },
        NewGameService,
      ],
    }).compile();

    playersService = moduleRef.get<PlayersService>(PlayersService);
    playerGameDetailsService = moduleRef.get<PlayerGameDetailsService>(PlayerGameDetailsService);
    gamesService = moduleRef.get<GamesService>(GamesService);
    newGameService = moduleRef.get<NewGameService>(NewGameService);
  });

  it('should be defined', () => {
    expect(newGameService).toBeDefined();
    expect(playersService).toBeDefined();
    expect(playerGameDetailsService).toBeDefined();
    expect(gamesService).toBeDefined();
  });

  describe('validatePlayersExist', () => {
    it('should throw error when one or more players is not found', async () => {
      const findCardsSpy = jest
        .spyOn(playersService, 'findPlayersByRef')
        .mockResolvedValueOnce([MOCK_PLAYER_1]);

      const output = async () => await newGameService.validatePlayersExist(MOCK_PLAYER_REFS);

      expect(output).rejects.toThrow('One or more players not found');
      expect(findCardsSpy).toHaveBeenCalledWith(MOCK_PLAYER_REFS);
    });

    it('should return true when all players exist', async () => {
      const findCardsSpy = jest
        .spyOn(playersService, 'findPlayersByRef')
        .mockResolvedValueOnce(MOCK_PLAYERS);

      const output = await newGameService.validatePlayersExist(MOCK_PLAYER_REFS);

      expect(findCardsSpy).toHaveBeenCalledWith(MOCK_PLAYER_REFS);
      expect(output).toBe(true);
    });
  });

  describe('validateUniqueGame', () => {
    it('should throw error when active game exists for players', async () => {
      const findActiveGameSpy = jest
        .spyOn(gamesService, 'findActiveGameByPlayers')
        .mockResolvedValueOnce(MOCK_GAME);

      const output = async () => await newGameService.validateUniqueGame(MOCK_PLAYER_REFS);

      expect(output).rejects.toThrow('Active game already exists for these players');
      expect(findActiveGameSpy).toHaveBeenCalledWith(MOCK_PLAYER_REFS);
    });

    it('should return true when no active game exists for players', async () => {
      const findActiveGameSpy = jest
        .spyOn(gamesService, 'findActiveGameByPlayers')
        .mockResolvedValueOnce(null);

      const output = await newGameService.validateUniqueGame(MOCK_PLAYER_REFS);

      expect(findActiveGameSpy).toHaveBeenCalledWith(MOCK_PLAYER_REFS);
      expect(output).toBe(true);
    });
  });

  describe('getGameSetup', () => {
    it('should return initial game setup data', () => {
      const shuffleSpy = jest.spyOn(helpers, 'shuffleDeck').mockReturnValueOnce(MOCK_DECK);
      const pickAchievementsSpy = jest.spyOn(helpers, 'pickAgeAchievements').mockReturnValueOnce({
        ageAchievements: MOCK_STARTER_ACHIEVEMENTS,
        deckMinusAchievements: MOCK_DECK,
      });
      const selectHandsSpy = jest
        .spyOn(helpers, 'selectStarterHandsForPlayers')
        .mockReturnValueOnce({
          playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
          deckMinusStarterHands: MOCK_DECK,
        });

      const output = newGameService.getGameSetup(MOCK_CARD_REFS_BY_AGE, MOCK_PLAYER_REFS);

      expect(shuffleSpy).toHaveBeenCalledWith(MOCK_CARD_REFS_BY_AGE);
      expect(pickAchievementsSpy).toHaveBeenCalledWith(MOCK_DECK);
      expect(selectHandsSpy).toHaveBeenCalledWith(MOCK_DECK, MOCK_PLAYER_REFS);
      expect(output).toEqual({
        deck: MOCK_DECK,
        achievements: MOCK_STARTER_ACHIEVEMENTS,
        playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
      });
    });
  });

  describe('startGame', () => {
    it('should throw error if new game _id is not returned', async () => {
      const createGameSpy = jest
        .spyOn(gamesService, 'create')
        .mockResolvedValueOnce(MOCK_GAME_INPUT);

      const output = async () =>
        await newGameService.startGame({
          playerRefs: MOCK_PLAYER_REFS,
          starterDeck: MOCK_DECK,
          ageAchievements: MOCK_STARTER_ACHIEVEMENTS,
          playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
        });

      expect(output).rejects.toThrow('New game created missing _id');
      expect(createGameSpy).toHaveBeenCalledWith({
        currentActionNumber: 2,
        currentPlayerRef: MOCK_PLAYER_REFS[0],
        playerRefs: MOCK_PLAYER_REFS,
        deck: MOCK_DECK,
        achievements: MOCK_STARTER_ACHIEVEMENTS,
      });
    });

    it('should return new game response when new game data creation successful', async () => {
      const createGameSpy = jest.spyOn(gamesService, 'create').mockResolvedValueOnce(MOCK_GAME);
      const detailsSpy = jest
        .spyOn(playerGameDetailsService, 'create')
        .mockResolvedValue(MOCK_PLAYER_2_DETAILS)
        .mockResolvedValueOnce(MOCK_PLAYER_1_DETAILS);

      const output = await newGameService.startGame({
        playerRefs: MOCK_PLAYER_REFS,
        starterDeck: MOCK_DECK,
        ageAchievements: MOCK_STARTER_ACHIEVEMENTS,
        playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
      });

      expect(createGameSpy).toHaveBeenCalledWith({
        currentActionNumber: 2,
        currentPlayerRef: MOCK_PLAYER_REFS[0],
        playerRefs: MOCK_PLAYER_REFS,
        deck: MOCK_DECK,
        achievements: MOCK_STARTER_ACHIEVEMENTS,
      });
      expect(detailsSpy).toHaveBeenCalledTimes(2);
      expect(output).toEqual(MOCK_NEW_GAME_RESPONSE);
    });
  });
});