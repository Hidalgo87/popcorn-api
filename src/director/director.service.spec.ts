import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { PrismaService } from '../prisma/prisma.service';

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

  it('should create a director', async () => {
    const dto = { name: 'Christopher Nolan' };
    mockPrisma.director.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);

    expect(prisma.director.create).toHaveBeenCalledWith({
      data: dto,
    });
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all directors', async () => {
    const directors = [{ id: 1, name: 'Nolan' }];
    mockPrisma.director.findMany.mockResolvedValue(directors);

    const result = await service.findAll();

    expect(prisma.director.findMany).toHaveBeenCalled();
    expect(result).toEqual(directors);
  });

  it('should return one director', async () => {
    const director = { id: 1, name: 'Nolan' };
    mockPrisma.director.findUnique.mockResolvedValue(director);

    const result = await service.findOne(1);

    expect(prisma.director.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      // include: {
      //   movies: true,
      // },
    });
    expect(result).toEqual(director);
  });
  it('should update a director', async () => {
    const updated = { id: 1, name: 'Updated Name' };
    mockPrisma.director.update.mockResolvedValue(updated);

    const result = await service.update(1, { name: 'Updated Name' } as any);

    expect(prisma.director.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'Updated Name' },
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
});
