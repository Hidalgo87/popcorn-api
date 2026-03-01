import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let controller: ReviewController;
  let service: ReviewService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<ReviewService>(ReviewService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create review', async () => {
    const dto = { rating: 5, movieId: 1 };
    mockService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all reviews', async () => {
    const data = [{ id: 1 }];
    mockService.findAll.mockResolvedValue(data);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(data);
  });

  it('should return one review', async () => {
    const review = { id: 1 };
    mockService.findOne.mockResolvedValue(review);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(review);
  });

  it('should update review', async () => {
    const updated = { id: 1 };
    mockService.update.mockResolvedValue(updated);

    const result = await controller.update('1', { rating: 4 } as any);

    expect(service.update).toHaveBeenCalledWith(1, { rating: 4 });
    expect(result).toEqual(updated);
  });

  it('should remove review', async () => {
    const deleted = { id: 1 };
    mockService.remove.mockResolvedValue(deleted);

    const result = await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(deleted);
  });
});
