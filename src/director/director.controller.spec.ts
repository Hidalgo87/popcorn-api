import { Test, TestingModule } from '@nestjs/testing';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';

describe('DirectorController', () => {
  let controller: DirectorController;
  let service: DirectorService;

  const mockDirectorService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectorController],
      providers: [
        {
          provide: DirectorService,
          useValue: mockDirectorService,
        },
      ],
    }).compile();

    controller = module.get<DirectorController>(DirectorController);
    service = module.get<DirectorService>(DirectorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  /*
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a director', async () => {
    const dto = { name: 'Nolan' };
    mockDirectorService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all directors', async () => {
    const directors = [{ id: 1, name: 'Nolan' }];
    mockDirectorService.findAll.mockResolvedValue(directors);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(directors);
  });

  it('should return one director', async () => {
    const director = { id: 1, name: 'Nolan' };
    mockDirectorService.findOne.mockResolvedValue(director);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(director);
  });

  it('should update a director', async () => {
    const updated = { id: 1, name: 'Updated' };
    mockDirectorService.update.mockResolvedValue(updated);

    const result = await controller.update('1', {
      name: 'Updated',
    } as any);

    expect(service.update).toHaveBeenCalledWith(1, { name: 'Updated' });
    expect(result).toEqual(updated);
  });

  it('should remove a director', async () => {
    const deleted = { id: 1 };
    mockDirectorService.remove.mockResolvedValue(deleted);

    const result = await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(deleted);
  });

  it('should propagate errors from service', async () => {
    mockDirectorService.findOne.mockRejectedValue(new Error('Service error'));

    await expect(controller.findOne('1')).rejects.toThrow('Service error');
  });
  */
});
