import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MovieService', () => {
  let service: MovieService;
  let prisma: PrismaService;

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
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a movie', async () => {
    const dto = { title: 'Inception', directorId: 1 };
    mockPrisma.movie.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);

    expect(prisma.movie.create).toHaveBeenCalledWith({
      data: dto,
    });
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all movies', async () => {
    const movies = [{ id: 1, title: 'Batman' }];
    mockPrisma.movie.findMany.mockResolvedValue(movies);

    const result = await service.findAll();

    expect(prisma.movie.findMany).toHaveBeenCalled();
    expect(result).toEqual(movies);
  });

  it('should return one movie', async () => {
    const movie = { id: 1, title: 'Batman' };
    mockPrisma.movie.findUnique.mockResolvedValue(movie);

    const result = await service.findOne(1);

    expect(prisma.movie.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { director: true, reviews: true },
    });
    expect(result).toEqual(movie);
  });

  it('should update a movie', async () => {
    const updated = { id: 1, title: 'Updated' };
    mockPrisma.movie.update.mockResolvedValue(updated);

    const result = await service.update(1, { title: 'Updated' } as any);

    expect(prisma.movie.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'Updated' },
    });
    expect(result).toEqual(updated);
  });

  it('should delete a movie', async () => {
    const deleted = { id: 1 };
    mockPrisma.movie.delete.mockResolvedValue(deleted);

    const result = await service.remove(1);

    expect(prisma.movie.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(deleted);
  });
});
