import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { SecretsService } from './secrets.service';
import { async } from 'rxjs';

describe('SecretsService', () => {
  let service: SecretsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretsService, ConfigService],
    }).compile();

    service = module.get<SecretsService>(SecretsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add secret to path', async () => {
    await service.setSecret('user1', { key: 'test' });
    const secret = await service.getSecret('user1', 'key');
    expect(secret).toBe('test');
  });

  afterAll(async () => {
    await service.deleteSecret('user1', 'key');
  });
});
