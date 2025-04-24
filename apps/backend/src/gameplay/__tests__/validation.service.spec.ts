import { Test } from '@nestjs/testing';

import { MOCK_NEW_ROOM, MOCK_ROOM_ID } from 'src/rooms/__mocks__/room.mock';
import { RoomsService } from 'src/rooms/rooms.service';
import { MOCK_USER, MOCK_USER_ID_2 } from 'src/users/__mocks__/user.mock';
import { UsersService } from 'src/users/users.service';

import { MOCK_PLAYER_REFS } from '../__mocks__/gameplay.mock';
import { VaildationService } from '../services/validation.service';

describe('ValidationService', () => {
  let usersService: UsersService;
  let roomsService: RoomsService;
  let validationService: VaildationService;

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
          provide: RoomsService,
          useValue: {
            findRoomByRef: jest.fn(),
          },
        },
        VaildationService,
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    roomsService = moduleRef.get<RoomsService>(RoomsService);
    validationService = moduleRef.get<VaildationService>(VaildationService);
  });

  it('should be defined', () => {
    expect(validationService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(roomsService).toBeDefined();
  });

  describe('validateRoomExists', () => {
    it('should throw error when room is not found', async () => {
      const findRoomSpy = jest.spyOn(roomsService, 'findRoomByRef').mockResolvedValueOnce(null);

      const output = async () => await validationService.validateRoomExists(MOCK_ROOM_ID);

      expect(output).rejects.toThrow('Room not found');
      expect(findRoomSpy).toHaveBeenCalledWith(MOCK_ROOM_ID);
    });

    it('should return true when room exists', async () => {
      const findRoomSpy = jest
        .spyOn(roomsService, 'findRoomByRef')
        .mockResolvedValueOnce(MOCK_NEW_ROOM);

      const output = await validationService.validateRoomExists(MOCK_ROOM_ID);

      expect(findRoomSpy).toHaveBeenCalledWith(MOCK_ROOM_ID);
      expect(output).toBe(true);
    });
  });

  describe('validatePlayersExist', () => {
    it('should throw error when one or more players is not found', async () => {
      const findCardsSpy = jest.spyOn(usersService, 'findUsers').mockResolvedValueOnce([MOCK_USER]);

      const output = async () => await validationService.validatePlayersExist(MOCK_PLAYER_REFS);

      expect(output).rejects.toThrow('One or more players not found');
      expect(findCardsSpy).toHaveBeenCalledWith({
        searchField: 'ref',
        searchValues: MOCK_PLAYER_REFS,
      });
    });

    it('should return true when all players exist', async () => {
      const findCardsSpy = jest
        .spyOn(usersService, 'findUsers')
        .mockResolvedValueOnce([MOCK_USER, { ...MOCK_USER, _id: MOCK_USER_ID_2 }]);

      const output = await validationService.validatePlayersExist(MOCK_PLAYER_REFS);

      expect(findCardsSpy).toHaveBeenCalledWith({
        searchField: 'ref',
        searchValues: MOCK_PLAYER_REFS,
      });
      expect(output).toBe(true);
    });
  });
});
