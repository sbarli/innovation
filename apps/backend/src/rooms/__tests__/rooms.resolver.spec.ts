import { GqlExecutionContext } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { JwtGqlAuthGuard } from 'src/auth/guards/jwt-gql-auth.guard';
import { MOCK_USER } from 'src/users/__mocks__/user.mock';

import { MOCK_NEW_ROOM, MOCK_CLOSED_ROOM, MOCK_ROOM_INPUT, MOCK_ID } from '../__mocks__/room.mock';
import { RoomsResolver } from '../rooms.resolver';
import { RoomsService } from '../rooms.service';

describe('RoomsResolver', () => {
  let roomsService: RoomsService;
  let roomsResolver: RoomsResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: RoomsService,
          useValue: {
            createRoom: jest.fn(() => MOCK_NEW_ROOM),
            findRoomByRef: jest.fn(() => MOCK_CLOSED_ROOM),
            findRoomsByPlayerRef: jest.fn(),
            addPlayerToRoom: jest.fn(),
            updateRoomAvailability: jest.fn(() => MOCK_CLOSED_ROOM),
            validateUserIsRoomHost: jest.fn(() => true),
          },
        },
        RoomsResolver,
      ],
    })
      .overrideGuard(JwtGqlAuthGuard)
      .useValue({
        getRequest: (context: GqlExecutionContext) => {
          const ctx = GqlExecutionContext.create(context);
          ctx.getContext().req.user = MOCK_USER;
          return ctx.getContext().req;
        },
      })
      .compile();

    roomsService = moduleRef.get<RoomsService>(RoomsService);
    roomsResolver = moduleRef.get<RoomsResolver>(RoomsResolver);
  });

  it('should be defined', () => {
    expect(roomsResolver).toBeDefined();
  });

  describe('queries', () => {
    describe('getRoom', () => {
      it('should return output of calling roomsService.findRoomByRef', async () => {
        jest.spyOn(roomsService, 'findRoomByRef');
        const output = await roomsResolver.getRoom(MOCK_ID);
        expect(output).toEqual(MOCK_CLOSED_ROOM);
      });
    });

    describe('getRoomsForPlayer', () => {
      it('should return output of calling roomsService.findRoomsByPlayerRef', async () => {
        const spy = jest
          .spyOn(roomsService, 'findRoomsByPlayerRef')
          .mockResolvedValueOnce([MOCK_NEW_ROOM, MOCK_CLOSED_ROOM]);
        const output = await roomsResolver.getRoomsForPlayer(MOCK_USER);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(output).toEqual([MOCK_NEW_ROOM, MOCK_CLOSED_ROOM]);
      });
    });
  });

  describe('mutations', () => {
    describe('createRoom', () => {
      it('should return output of calling roomsService.createRoom', async () => {
        jest.spyOn(roomsService, 'createRoom');
        const output = await roomsResolver.createRoom(MOCK_USER, MOCK_ROOM_INPUT);
        expect(output).toEqual(MOCK_NEW_ROOM);
      });
    });

    describe('updateRoomAvailability', () => {
      it('should return output of calling roomsService.updateRoomAvailability', async () => {
        const updateServiceSpy = jest.spyOn(roomsService, 'updateRoomAvailability');
        const validateServiceSpy = jest.spyOn(roomsService, 'validateUserIsRoomHost');
        const output = await roomsResolver.updateRoomAvailability(MOCK_USER, {
          roomId: MOCK_ID,
          availableToJoin: false,
        });
        expect(validateServiceSpy).toHaveBeenCalledTimes(1);
        expect(updateServiceSpy).toHaveBeenCalledTimes(1);
        expect(output).toEqual(MOCK_CLOSED_ROOM);
      });
    });
  });
});
