import { Test, TestingModule } from '@nestjs/testing';

import { SocketGateway } from '../socket.gateway';
import { SocketService } from '../socket.service';

describe('SocketGateway', () => {
  let gateway: SocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SocketService,
          useValue: {
            handleConnection: jest.fn(),
            handleJoinRoom: jest.fn(),
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
