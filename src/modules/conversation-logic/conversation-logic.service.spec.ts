import { Test, TestingModule } from '@nestjs/testing';
import { ConversationLogicService } from './conversation-logic.service';

describe.skip('ConversationLogicService', () => {
  let service: ConversationLogicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationLogicService],
    }).compile();

    service = module.get<ConversationLogicService>(ConversationLogicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
