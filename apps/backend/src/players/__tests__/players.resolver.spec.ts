import { Test } from '@nestjs/testing';

import {
  MOCK_GET_PLAYER_BY_INVALID_INPUT,
  MOCK_GET_PLAYER_BY_PLAYER_ID_INPUT,
  MOCK_GET_PLAYER_BY_REF_INPUT,
  MOCK_PLAYER,
  MOCK_PLAYER_INPUT,
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
            findPlayerByRef: jest.fn(() => MOCK_PLAYER),
            findPlayerByPlayerId: jest.fn(() => MOCK_PLAYER),
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

  describe('query -> getPlayer', () => {
    it('should throw error when searchField is invalid', async () => {
      const output = async () => await playersResolver.getPlayer(MOCK_GET_PLAYER_BY_INVALID_INPUT);
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

  describe('mutation -> createPlayer', () => {
    it('should throw error if player already exists with passed playerId', async () => {
      const serviceSpy = jest
        .spyOn(playersService, 'findPlayerByPlayerId')
        .mockResolvedValueOnce(MOCK_PLAYER);
      const output = async () => await playersResolver.createPlayer(MOCK_PLAYER_INPUT);
      expect(output).rejects.toThrow('Unable to create player with this playerId');
      expect(serviceSpy).toHaveBeenCalledWith(MOCK_PLAYER_INPUT.playerId);
    });

    it('should return output of calling playersService.create when playerId is unique', async () => {
      jest.spyOn(playersService, 'findPlayerByPlayerId').mockResolvedValueOnce(undefined);
      const output = await playersResolver.createPlayer(MOCK_PLAYER_INPUT);
      expect(output).toEqual(MOCK_PLAYER);
    });
  });
});