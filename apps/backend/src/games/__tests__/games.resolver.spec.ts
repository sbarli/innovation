import { Test } from '@nestjs/testing';

import { MOCK_USER_ID_2 } from 'src/users/__mocks__/user.mock';

import {
  MOCK_GAME_UPDATE_VALIDATION_ERROR,
  MOCK_GAME_UPDATE_VALIDATION_PASS,
  MOCK_VALIDATION_ERROR_MESSAGE,
} from '../__mocks__/game-validation-error.mock';
import { MOCK_GAME, MOCK_GAME_INPUT, MOCK_GAME_WITH_WINNER, MOCK_ID } from '../__mocks__/game.mock';
import { GamesResolver } from '../games.resolver';
import { GamesService } from '../games.service';
import * as helpers from '../helpers/validate-game-updates';

describe('GamesResolver', () => {
  let gamesService: GamesService;
  let gamesResolver: GamesResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: GamesService,
          useValue: {
            create: jest.fn(() => MOCK_GAME),
            findGameById: jest.fn(() => MOCK_GAME),
            findActiveGameByPlayers: jest.fn(),
            updateGameByRef: jest.fn(),
          },
        },
        GamesResolver,
      ],
    }).compile();

    gamesService = moduleRef.get<GamesService>(GamesService);
    gamesResolver = moduleRef.get<GamesResolver>(GamesResolver);
  });

  it('should be defined', () => {
    expect(gamesResolver).toBeDefined();
  });

  describe('queries', () => {
    describe('getGame', () => {
      it('should return output of calling gamesService.findGameById', async () => {
        jest.spyOn(gamesService, 'findGameById');
        const output = await gamesResolver.getGame(MOCK_ID);
        expect(output).toEqual(MOCK_GAME);
      });
      // it('should throw error when searchField is invalid', async () => {
      //   const output = async () => await gamesResolver.getPlayer(MOCK_GET_PLAYER_BY_INVALID_INPUT);
      //   expect(output).rejects.toThrow('playerId or ref required to find player');
      // });
    });
  });

  describe('mutations', () => {
    describe('createNewGame', () => {
      it('should return output of calling gamesService.create', async () => {
        jest.spyOn(gamesService, 'create');
        const output = await gamesResolver.createNewGame(MOCK_GAME_INPUT);
        expect(output).toEqual(MOCK_GAME);
      });
    });

    describe('updateGame', () => {
      it('should should throw error when input is invalid', async () => {
        jest
          .spyOn(helpers, 'validateGameUpdates')
          .mockReturnValueOnce(MOCK_GAME_UPDATE_VALIDATION_ERROR);
        const updateSpy = jest.spyOn(gamesService, 'updateGameByRef');
        const output = async () => await gamesResolver.updateGame(MOCK_ID, {});
        expect(output).rejects.toThrow(`Unable to update game: ${MOCK_VALIDATION_ERROR_MESSAGE}`);
        expect(updateSpy).not.toHaveBeenCalled();
      });

      it('should should return output of calling gamesService.updateGameByRef when input is invalid', async () => {
        const GAME_UPDATES = { winnerRef: MOCK_USER_ID_2 };
        jest
          .spyOn(helpers, 'validateGameUpdates')
          .mockReturnValueOnce(MOCK_GAME_UPDATE_VALIDATION_PASS);
        const updateSpy = jest
          .spyOn(gamesService, 'updateGameByRef')
          .mockResolvedValueOnce(MOCK_GAME_WITH_WINNER);
        const output = await gamesResolver.updateGame(MOCK_ID, GAME_UPDATES);
        expect(updateSpy).toHaveBeenCalledWith({
          ref: MOCK_ID,
          gameUpdates: GAME_UPDATES,
        });
        expect(output).toEqual(MOCK_GAME_WITH_WINNER);
      });
    });
  });
});
