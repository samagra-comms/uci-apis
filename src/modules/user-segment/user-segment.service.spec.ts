import { Test, TestingModule } from '@nestjs/testing';
import { UserSegmentService } from './user-segment.service';

describe('UserSegmentService', () => {
  let service: UserSegmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSegmentService],
    }).compile();

    service = module.get<UserSegmentService>(UserSegmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
