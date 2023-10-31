import { Test } from '@nestjs/testing';

import {
  MOCK_GET_PLAYERS_BY_INVALID_INPUT,
  MOCK_GET_PLAYERS_BY_PLAYER_ID_INPUT,
  MOCK_GET_PLAYERS_BY_REF_INPUT,
  MOCK_GET_PLAYER_BY_INVALID_INPUT,
  MOCK_GET_PLAYER_BY_PLAYER_ID_INPUT,
  MOCK_GET_PLAYER_BY_REF_INPUT,
  MOCK_PLAYER,
  MOCK_PLAYERS_INPUT,
  MOCK_PLAYER_1,
  MOCK_PLAYER_2,
  MOCK_PLAYER_ID,
  MOCK_PLAYER_ID_2,
  MOCK_PLAYER_INPUT,
  MOCK_PLAYER_NAME,
  MOCK_PLAYER_NAME_2,
} from '../__mocks__/player.mock';
import { PlayersResolver } from '../players.resolver';
import { PlayersService } from '../players.service';

describe('PlayersResolver', () => {
  let playersService: PlayersService;
  let playersResolver: PlayersResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PlayersService,
          useValue: {
            create: jest.fn(() => MOCK_PLAYER),
            createPlayers: jest.fn(() => [MOCK_PLAYER_1, MOCK_PLAYER_2]),
            findPlayerByRef: jest.fn(() => MOCK_PLAYER),
            findPlayerByPlayerId: jest.fn(() => MOCK_PLAYER),
            findPlayers: jest.fn(() => [MOCK_PLAYER]),
            getPlayerIdFromName: jest.fn(() => MOCK_PLAYER_ID),
          },
        },
        PlayersResolver,
      ],
    }).compile();

    playersService = moduleRef.get<PlayersService>(PlayersService);
    playersResolver = moduleRef.get<PlayersResolver>(PlayersResolver);
  });

  it('should be defined', () => {
    expect(playersResolver).toBeDefined();
  });

  describe('Queries', () => {
    describe('getPlayer', () => {
      it('should throw error when searchField is invalid', async () => {
        const output = async () =>
          await playersResolver.getPlayer(MOCK_GET_PLAYER_BY_INVALID_INPUT);
        expect(output).rejects.toThrow('playerId or ref required to find player');
      });

      it('should return output of calling playersService.findPlayerByPlayerId with searchValue when searchField is `playerId`', async () => {
        const serviceSpy = jest.spyOn(playersService, 'findPlayerByPlayerId');
        const output = await playersResolver.getPlayer(MOCK_GET_PLAYER_BY_PLAYER_ID_INPUT);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(MOCK_GET_PLAYER_BY_PLAYER_ID_INPUT.searchValue);
        expect(output).toEqual(MOCK_PLAYER);
      });

      it('should return output of calling playersService.findPlayerByPlayerId with searchValue when searchField is `ref`', async () => {
        const serviceSpy = jest.spyOn(playersService, 'findPlayerByRef');
        const output = await playersResolver.getPlayer(MOCK_GET_PLAYER_BY_REF_INPUT);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(MOCK_GET_PLAYER_BY_REF_INPUT.searchValue);
        expect(output).toEqual(MOCK_PLAYER);
      });
    });

    describe('getPlayers', () => {
      it('should throw error when searchField is invalid', async () => {
        const serviceSpy = jest.spyOn(playersService, 'findPlayers');
        const output = async () =>
          await playersResolver.getPlayers(MOCK_GET_PLAYERS_BY_INVALID_INPUT);
        expect(output).rejects.toThrow(
          'PlayersResolver -> Query -> getPlayers: searchField must be playerId or ref required to find player'
        );
        expect(serviceSpy).not.toHaveBeenCalled();
      });

      it('should return output of calling playersService.findPlayers with searchValue when searchField is `playerId`', async () => {
        const serviceSpy = jest.spyOn(playersService, 'findPlayers');
        const output = await playersResolver.getPlayers(MOCK_GET_PLAYERS_BY_PLAYER_ID_INPUT);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(MOCK_GET_PLAYERS_BY_PLAYER_ID_INPUT);
        expect(output).toEqual([MOCK_PLAYER]);
      });

      it('should return output of calling playersService.findPlayers with searchValue when searchField is `ref`', async () => {
        const serviceSpy = jest.spyOn(playersService, 'findPlayers');
        const output = await playersResolver.getPlayers(MOCK_GET_PLAYERS_BY_REF_INPUT);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(serviceSpy).toHaveBeenCalledWith(MOCK_GET_PLAYERS_BY_REF_INPUT);
        expect(output).toEqual([MOCK_PLAYER]);
      });
    });
  });

  describe('Mutations', () => {
    describe('createPlayer', () => {
      it('should throw error if player already exists with playerId', async () => {
        const getPlayerIdSpy = jest.spyOn(playersService, 'getPlayerIdFromName');
        const findSpy = jest
          .spyOn(playersService, 'findPlayerByPlayerId')
          .mockResolvedValueOnce(MOCK_PLAYER);
        const output = async () => await playersResolver.createPlayer(MOCK_PLAYER_INPUT);
        expect(output).rejects.toThrow('Unable to create player with this playerId');
        expect(getPlayerIdSpy).toHaveBeenCalledWith(MOCK_PLAYER_NAME);
        expect(findSpy).toHaveBeenCalledWith(MOCK_PLAYER_ID);
      });

      it('should return output of calling playersService.create when playerId is unique', async () => {
        const getPlayerIdSpy = jest.spyOn(playersService, 'getPlayerIdFromName');
        const findSpy = jest
          .spyOn(playersService, 'findPlayerByPlayerId')
          .mockResolvedValueOnce(undefined);
        const output = await playersResolver.createPlayer(MOCK_PLAYER_INPUT);
        expect(output).toEqual(MOCK_PLAYER);
        expect(getPlayerIdSpy).toHaveBeenCalledWith(MOCK_PLAYER_NAME);
        expect(findSpy).toHaveBeenCalledWith(MOCK_PLAYER_ID);
      });
    });

    describe('createPlayers', () => {
      it('should throw error if one or more players already exists with playerId', async () => {
        jest
          .spyOn(playersService, 'findPlayers')
          .mockResolvedValueOnce([MOCK_PLAYER, { ...MOCK_PLAYER, playerId: MOCK_PLAYER_ID_2 }]);
        const output = async () => await playersResolver.createPlayers(MOCK_PLAYERS_INPUT);
        expect(output).rejects.toThrow(
          `Unable to create players. The following player id(s) already exist: ${MOCK_PLAYER_ID}, ${MOCK_PLAYER_ID_2}`
        );
      });

      it('should return output of calling playersService.create when playerId is unique', async () => {
        const getPlayerIdSpy = jest.spyOn(playersService, 'getPlayerIdFromName');
        const findSpy = jest.spyOn(playersService, 'findPlayers').mockResolvedValueOnce([]);
        const output = await playersResolver.createPlayers(MOCK_PLAYERS_INPUT);
        expect(output).toEqual([MOCK_PLAYER_1, MOCK_PLAYER_2]);
        expect(getPlayerIdSpy).toHaveBeenCalledTimes(2);
        expect(getPlayerIdSpy).toHaveBeenNthCalledWith(1, MOCK_PLAYER_NAME);
        expect(getPlayerIdSpy).toHaveBeenLastCalledWith(MOCK_PLAYER_NAME_2);
        expect(findSpy).toHaveBeenCalledWith({
          searchField: 'playerId',
          searchValues: [MOCK_PLAYER_ID, MOCK_PLAYER_ID],
        });
      });
    });
  });
});
