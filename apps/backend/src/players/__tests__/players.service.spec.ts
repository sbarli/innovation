import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { MOCK_PLAYER, MOCK_PLAYER_ID, MOCK_PLAYER_NAME } from '../__mocks__/player.mock';
import { PlayersService } from '../players.service';
import { Player } from '../schemas/player.schema';

describe('PlayersService', () => {
  // let playerModel: Model<PlayerDocument>;
  let playersService: PlayersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Player.name),
          useValue: {
            find: jest.fn().mockResolvedValue([MOCK_PLAYER]),
            findOne: jest.fn().mockResolvedValue(MOCK_PLAYER),
            save: jest.fn().mockResolvedValue(MOCK_PLAYER),
          },
        },
        PlayersService,
      ],
    }).compile();

    // playerModel = moduleRef.get<Model<PlayerDocument>>(getModelToken(Player.name));
    playersService = moduleRef.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersService).toBeDefined();
  });

  describe('getPlayerIdFromName', () => {
    it.each`
      inputName                      | expectedOutput
      ${MOCK_PLAYER_NAME}            | ${MOCK_PLAYER_ID}
      ${' T3st!nG  '}                | ${'t3stng'}
      ${'  %-S_m72./{0abc  _ : !  '} | ${'sm720abc'}
    `(
      "should return '$expectedOutput' as playerId when name is '$inputName'",
      ({ inputName, expectedOutput }) => {
        const playerId = playersService.getPlayerIdFromName(inputName);
        expect(playerId).toBe(expectedOutput);
      }
    );
  });
});
