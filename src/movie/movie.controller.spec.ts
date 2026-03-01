import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  const mockMovieService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a movie', async () => {
    const dto = { title: 'Test', directorId: 1 };
    mockMovieService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all movies', async () => {
    const movies = [{ id: 1 }];
    mockMovieService.findAll.mockResolvedValue(movies);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(movies);
  });

  it('should return one movie', async () => {
    const movie = { id: 1 };
    mockMovieService.findOne.mockResolvedValue(movie);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(movie);
  });

  it('should update a movie', async () => {
    const updated = { id: 1, title: 'Updated' };
    mockMovieService.update.mockResolvedValue(updated);

    const result = await controller.update('1', { title: 'Updated' } as any);

    expect(service.update).toHaveBeenCalledWith(1, {
      title: 'Updated',
    });
    expect(result).toEqual(updated);
  });

  it('should remove a movie', async () => {
    const deleted = { id: 1 };
    mockMovieService.remove.mockResolvedValue(deleted);

    const result = await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(deleted);
  });
});
