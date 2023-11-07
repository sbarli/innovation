import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { MOCK_USER } from '../__mocks__/user.mock';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn().mockResolvedValue(MOCK_USER),
            findOne: jest.fn().mockResolvedValue(MOCK_USER),
          },
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
