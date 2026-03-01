import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MovieService', () => {
  let service: MovieService;

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
        MovieService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
