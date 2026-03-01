import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  const mockPrisma = {
    director: {
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
        ReviewService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
