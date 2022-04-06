import { Test, TestingModule } from '@nestjs/testing';
import { SecretsController } from './secrets.controller';

describe('SecretsController', () => {
  let controller: SecretsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretsController],
    }).compile();

    controller = module.get<SecretsController>(SecretsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
