import { Test } from '@nestjs/testing';

import { UsersService } from '../../users/users.service';
import {
  MOCK_GAME_REF,
  MOCK_PLAYER_GAME_DETAILS,
  MOCK_PLAYER_GAME_DETAILS_ID,
  MOCK_PLAYER_GAME_DETAILS_INPUT,
  MOCK_PLAYER_REF,
} from '../__mocks__/player-game-details.mock';
import { PlayerGameDetailsResolver } from '../player-game-details.resolver';
import { PlayerGameDetailsService } from '../player-game-details.service';
import { PlayerGameDetails } from '../schemas/player-game-details.schema';

describe('PlayerGameDetailsResolver', () => {
  let playerGameDetailsService: PlayerGameDetailsService;
  let playerGameDetailsResolver: PlayerGameDetailsResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PlayerGameDetailsService,
          useValue: {
            findById: jest.fn(() => MOCK_PLAYER_GAME_DETAILS),
            findDetailsByGameAndPlayer: jest.fn(),
            create: jest.fn(() => MOCK_PLAYER_GAME_DETAILS),
            updateById: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getUsernameByRef: jest.fn(),
          },
        },
        PlayerGameDetailsResolver,
      ],
    }).compile();

    playerGameDetailsService = moduleRef.get<PlayerGameDetailsService>(PlayerGameDetailsService);
    playerGameDetailsResolver = moduleRef.get<PlayerGameDetailsResolver>(PlayerGameDetailsResolver);
  });

  it('should be defined', () => {
    expect(playerGameDetailsResolver).toBeDefined();
  });

  describe('queries', () => {
    describe('getPlayerGameDetails', () => {
      it('should return output of calling playerGameDetailsService.findPlayerByPlayerId with searchValue when searchField is `playerId`', async () => {
        const serviceSpy = jest
          .spyOn(playerGameDetailsService, 'findDetailsByGameAndPlayer')
          .mockResolvedValueOnce(MOCK_PLAYER_GAME_DETAILS);
        const output = await playerGameDetailsResolver.getPlayerGameDetails(
          MOCK_GAME_REF,
          MOCK_PLAYER_REF
        );
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith({
          gameRef: MOCK_GAME_REF,
          playerRef: MOCK_PLAYER_REF,
        });
        expect(output).toEqual(MOCK_PLAYER_GAME_DETAILS);
      });
    });

    describe('getPlayerGameDetailsById', () => {
      it('should return output of calling playerGameDetailsService.findById', async () => {
        const serviceSpy = jest
          .spyOn(playerGameDetailsService, 'findById')
          .mockResolvedValueOnce(MOCK_PLAYER_GAME_DETAILS);
        const output = await playerGameDetailsResolver.getPlayerGameDetailsById(
          MOCK_PLAYER_GAME_DETAILS_ID
        );
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(MOCK_PLAYER_GAME_DETAILS_ID);
        expect(output).toEqual(MOCK_PLAYER_GAME_DETAILS);
      });
    });
  });

  describe('mutations', () => {
    describe('createPlayerGameDetails', () => {
      it('should throw error if details already exist for the player / game combo', async () => {
        const serviceSpy = jest
          .spyOn(playerGameDetailsService, 'findDetailsByGameAndPlayer')
          .mockResolvedValueOnce(MOCK_PLAYER_GAME_DETAILS);
        const output = async () =>
          await playerGameDetailsResolver.createPlayerGameDetails(MOCK_PLAYER_GAME_DETAILS_INPUT);
        expect(output).rejects.toThrow(
          'This player already has game details. Did you mean to update?'
        );
        expect(serviceSpy).toHaveBeenCalledWith({
          gameRef: MOCK_GAME_REF,
          playerRef: MOCK_PLAYER_REF,
        });
      });

      it('should return output of calling playerGameDetailsService.create when no details currently exist for player / game combo', async () => {
        jest
          .spyOn(playerGameDetailsService, 'findDetailsByGameAndPlayer')
          .mockResolvedValueOnce(undefined);
        const output = await playerGameDetailsResolver.createPlayerGameDetails(
          MOCK_PLAYER_GAME_DETAILS_INPUT
        );
        expect(output).toEqual(MOCK_PLAYER_GAME_DETAILS);
      });
    });

    describe('updatePlayerGameDetails', () => {
      it('should return output of calling playerGameDetailsService.updateById', async () => {
        const MOCK_UPDATED_PLAYER_GAME_DETAILS: PlayerGameDetails = {
          ...MOCK_PLAYER_GAME_DETAILS,
          hand: [],
        };
        jest
          .spyOn(playerGameDetailsService, 'updateById')
          .mockResolvedValueOnce(MOCK_UPDATED_PLAYER_GAME_DETAILS);
        const output = await playerGameDetailsResolver.updatePlayerGameDetails(
          MOCK_PLAYER_GAME_DETAILS_ID,
          { hand: [] }
        );
        expect(output).toEqual(MOCK_UPDATED_PLAYER_GAME_DETAILS);
      });
    });
  });
});
