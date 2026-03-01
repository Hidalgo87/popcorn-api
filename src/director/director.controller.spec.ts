import { Test, TestingModule } from '@nestjs/testing';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';

describe('DirectorController', () => {
  let controller: DirectorController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
