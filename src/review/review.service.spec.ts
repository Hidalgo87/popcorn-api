import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let prisma: PrismaService;

  const mockPrisma = {
    review: {
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
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a review', async () => {
    const dto = { content: 'Great movie!', movieId: 1 };
    mockPrisma.review.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);

    expect(prisma.review.create).toHaveBeenCalledWith({
      data: dto,
    });
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all reviews', async () => {
    const reviews = [{ id: 1, content: 'Nice' }];
    mockPrisma.review.findMany.mockResolvedValue(reviews);

    const result = await service.findAll();

    expect(prisma.review.findMany).toHaveBeenCalled();
    expect(result).toEqual(reviews);
  });

  it('should return one review', async () => {
    const review = { id: 1, content: 'Nice' };
    mockPrisma.review.findUnique.mockResolvedValue(review);

    const result = await service.findOne(1);

    expect(prisma.review.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { movie: true },
    });
    expect(result).toEqual(review);
  });

  it('should update a review', async () => {
    const updated = { id: 1, content: 'Updated review' };
    mockPrisma.review.update.mockResolvedValue(updated);

    const result = await service.update(1, {
      content: 'Updated review',
    } as any);

    expect(prisma.review.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { content: 'Updated review' },
    });
    expect(result).toEqual(updated);
  });

  it('should delete a review', async () => {
    const deleted = { id: 1 };
    mockPrisma.review.delete.mockResolvedValue(deleted);

    const result = await service.remove(1);

    expect(prisma.review.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(deleted);
  });
});
