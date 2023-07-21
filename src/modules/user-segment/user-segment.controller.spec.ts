import { Test, TestingModule } from '@nestjs/testing';
import { UserSegmentController } from './user-segment.controller';
import { UserSegmentService } from './user-segment.service';

describe.skip('UserSegmentController', () => {
  let controller: UserSegmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSegmentController],
      providers: [UserSegmentService],
    }).compile();

    controller = module.get<UserSegmentController>(UserSegmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
