import { Test, TestingModule } from '@nestjs/testing';
import { AdaptersService } from './adapters.service';

describe('AdaptersService', () => {
  let service: AdaptersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdaptersService],
    }).compile();

    service = module.get<AdaptersService>(AdaptersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
