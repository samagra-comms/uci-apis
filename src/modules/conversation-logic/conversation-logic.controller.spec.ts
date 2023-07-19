import { Test, TestingModule } from '@nestjs/testing';
import { ConversationLogicController } from './conversation-logic.controller';
import { ConversationLogicService } from './conversation-logic.service';

describe.skip('ConversationLogicController', () => {
  let controller: ConversationLogicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationLogicController],
      providers: [ConversationLogicService],
    }).compile();

    controller = module.get<ConversationLogicController>(ConversationLogicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
