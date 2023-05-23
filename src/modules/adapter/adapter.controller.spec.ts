import { Test, TestingModule } from '@nestjs/testing';
import { AdaptersController } from './adapter.controller';
import { AdaptersService } from './adapter.service';

describe('AdaptersController', () => {
  let controller: AdaptersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdaptersController],
      providers: [AdaptersService],
    }).compile();

    controller = module.get<AdaptersController>(AdaptersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
