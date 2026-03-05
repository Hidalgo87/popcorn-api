import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { DirectorService } from './director.service';

describe('DirectorService', () => {
  let service: DirectorService;
  let prisma: PrismaService;

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
        DirectorService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<DirectorService>(DirectorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  /*
  it('should create a director', async () => {
    const dto = { name: 'Christopher Nolan' };
    mockPrisma.director.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);

    expect(prisma.director.create).toHaveBeenCalledWith({
      data: dto,
    });

    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all directors with movies', async () => {
    const directors = [{ id: 1, name: 'Nolan' }];
    mockPrisma.director.findMany.mockResolvedValue(directors);

    const result = await service.findAll();

    expect(prisma.director.findMany).toHaveBeenCalledWith({
      include: {
        movies: true,
      },
    });

    expect(result).toEqual(directors);
  });

  it('should return empty array if no directors exist', async () => {
    mockPrisma.director.findMany.mockResolvedValue([]);

    const result = await service.findAll();

    expect(result).toEqual([]);
  });

  it('should return one director', async () => {
    const director = { id: 1, name: 'Nolan' };
    mockPrisma.director.findUnique.mockResolvedValue(director);

    const result = await service.findOne(1);

    expect(prisma.director.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        movies: true,
      },
    });

    expect(result).toEqual(director);
  });

  it('should return null if director not found', async () => {
    mockPrisma.director.findUnique.mockResolvedValue(null);

    const result = await service.findOne(999);

    expect(result).toBeNull();
  });

  it('should update a director', async () => {
    const updated = { id: 1, name: 'Updated' };
    mockPrisma.director.update.mockResolvedValue(updated);

    const result = await service.update(1, { name: 'Updated' } as any);

    expect(prisma.director.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'Updated' },
    });

    expect(result).toEqual(updated);
  });

  it('should delete a director', async () => {
    const deleted = { id: 1 };
    mockPrisma.director.delete.mockResolvedValue(deleted);

    const result = await service.remove(1);

    expect(prisma.director.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(deleted);
  });

  it('should propagate Prisma errors', async () => {
    mockPrisma.director.create.mockRejectedValue(new Error('DB error'));

    await expect(service.create({ name: 'Fail' } as any)).rejects.toThrow(
      'DB error',
    );
  });*/
});
