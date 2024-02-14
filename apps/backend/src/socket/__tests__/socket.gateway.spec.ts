import { Test, TestingModule } from '@nestjs/testing';

import { SocketBaseService } from '../services/socket-base.service';
import { SocketRoomService } from '../services/socket-room.service';
import { SocketGateway } from '../socket.gateway';

describe('SocketGateway', () => {
  let gateway: SocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SocketBaseService,
          useValue: {
            handleConnection: jest.fn(),
          },
        },
        {
          provide: SocketRoomService,
          useValue: {
            handleJoinRoom: jest.fn(),
            handleCloseRoom: jest.fn(),
            handleGetRoomMetadata: jest.fn(),
          },
        },
        SocketGateway,
      ],
    }).compile();
    gateway = module.get<SocketGateway>(SocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
