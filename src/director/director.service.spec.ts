import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DirectorService', () => {
  let service: DirectorService;

  const mockPrisma = {
    movie: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<DirectorService>(DirectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
