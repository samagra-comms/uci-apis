import { Test, TestingModule } from '@nestjs/testing';
import { AdapterController } from './adapter.controller';

describe('AdapterController', () => {
  let controller: AdapterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdapterController],
    }).compile();

    controller = module.get<AdapterController>(AdapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
