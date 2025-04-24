import { Test } from '@nestjs/testing';

import { GameStage } from '@inno/constants';

import { MOCK_CARD_REFS_BY_AGE } from 'src/cards/__mocks__/cards-sorting.mock';
import { MOCK_STARTER_AGE_ACHIEVEMENTS } from 'src/games/__mocks__/age-achievements.mock';
import { MOCK_DECK } from 'src/games/__mocks__/deck.mock';
import { MOCK_GAME } from 'src/games/__mocks__/game.mock';
import { GamesService } from 'src/games/games.service';
import { PlayerGameDetailsService } from 'src/player-game-details/player-game-details.service';
import { MOCK_ROOM_ID } from 'src/rooms/__mocks__/room.mock';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';

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
  let usersService: UsersService;
  let roomsService: RoomsService;
  let playerGameDetailsService: PlayerGameDetailsService;
  let gamesService: GamesService;
  let newGameService: NewGameService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            findUsers: jest.fn(),
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
        {
          provide: RoomsService,
          useValue: {
            findRoomByRef: jest.fn(),
          },
        },
        NewGameService,
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    roomsService = moduleRef.get<RoomsService>(RoomsService);
    playerGameDetailsService = moduleRef.get<PlayerGameDetailsService>(PlayerGameDetailsService);
    gamesService = moduleRef.get<GamesService>(GamesService);
    newGameService = moduleRef.get<NewGameService>(NewGameService);
  });

  it('should be defined', () => {
    expect(newGameService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(playerGameDetailsService).toBeDefined();
    expect(gamesService).toBeDefined();
    expect(roomsService).toBeDefined();
  });

  describe('getGameSetup', () => {
    it('should return initial game setup data', () => {
      const shuffleSpy = jest.spyOn(helpers, 'shuffleDeck').mockReturnValueOnce(MOCK_DECK);
      const pickAchievementsSpy = jest.spyOn(helpers, 'pickAgeAchievements').mockReturnValueOnce({
        ageAchievements: MOCK_STARTER_AGE_ACHIEVEMENTS,
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
        ageAchievements: MOCK_STARTER_AGE_ACHIEVEMENTS,
        playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
      });
    });
  });

  describe('newGame', () => {
    it('should return new game response when new game data creation successful', async () => {
      const createGameSpy = jest.spyOn(gamesService, 'create').mockResolvedValueOnce(MOCK_GAME);
      const detailsSpy = jest
        .spyOn(playerGameDetailsService, 'create')
        .mockResolvedValue(MOCK_PLAYER_2_DETAILS)
        .mockResolvedValueOnce(MOCK_PLAYER_1_DETAILS);

      const output = await newGameService.newGame({
        roomRef: MOCK_ROOM_ID,
        playerRefs: MOCK_PLAYER_REFS,
        starterDeck: MOCK_DECK,
        ageAchievements: MOCK_STARTER_AGE_ACHIEVEMENTS,
        playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
      });

      expect(createGameSpy).toHaveBeenCalledWith({
        roomRef: MOCK_ROOM_ID,
        currentActionNumber: 2,
        currentPlayerRef: MOCK_PLAYER_REFS[0],
        stage: GameStage.SETUP,
        playerRefs: MOCK_PLAYER_REFS,
        deck: MOCK_DECK,
        ageAchievements: MOCK_STARTER_AGE_ACHIEVEMENTS,
      });
      expect(detailsSpy).toHaveBeenCalledTimes(2);
      expect(output).toEqual(MOCK_NEW_GAME_RESPONSE);
    });
  });
});
