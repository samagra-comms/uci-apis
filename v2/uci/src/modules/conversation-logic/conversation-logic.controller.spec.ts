import { Test, TestingModule } from '@nestjs/testing';
import { ConversationLogicController } from './conversation-logic.controller';
import { ConversationLogicService } from './conversation-logic.service';
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { createMock } from '@golevelup/ts-jest';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';

describe('ConversationLogicController', () => {
  let controller: ConversationLogicController;
  let service: ConversationLogicService;

  class mockConversationLogic {
    public id: string;
    public name: string;
    public description: string | null;
    public adapterId: string;
    private createdAt = 1000000000000;
    private updatedAt = 1000000000000;

    constructor(...args) {
      if (args[0]) {
        this.id = args[0].id ? args[0].id : 'mockId';
        this.name = args[0].name ? args[0].name : 'mockName';
        this.description = args[0].description
          ? args[0].description
          : 'mockDescription';
        this.adapterId = args[0].adapter ? args[0].adapter : 'mockAdapterId';
      }
    }
  }

  const mockConversationLogicServiceValue = {
    create: jest.fn((mockCreateConversationLogicDto) => {
      const res = new mockConversationLogic(mockCreateConversationLogicDto);
      return { ...res };
    }),
    findAll: jest.fn().mockReturnValue([
      {
        ...new mockConversationLogic(),
      },
    ]),
    findOne: jest.fn((id) => {
      const res = new mockConversationLogic({});
      res.id = id;
      return { ...res };
    }),
    update: jest.fn((id, mockUpdateConversationLogicDto) => {
      const res = new mockConversationLogic(mockUpdateConversationLogicDto);
      res.id = id;
      return { ...res };
    }),
    remove: jest.fn((id) => {
      const res = new mockConversationLogic({});
      res.id = id;
      return { ...res };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationLogicController],
      providers: [
        {
          provide: ConversationLogicService,
          useValue: { ...mockConversationLogicServiceValue },
        },
      ],
    })
      .overrideInterceptor(AddAdminHeaderInterceptor)
      .useValue(createMock<AddAdminHeaderInterceptor>())
      .overrideInterceptor(AddOwnerInfoInterceptor)
      .useValue(createMock<AddOwnerInfoInterceptor>())
      .compile();

    controller = module.get<ConversationLogicController>(
      ConversationLogicController,
    );
    service = module.get<ConversationLogicService>(ConversationLogicService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('root', () => {
    it('Create() | Should return "ConversationLogic" object', () => {
      const res = new mockConversationLogic({
        id: 'mockId2',
        name: 'mockName2',
        description: 'mockDescription2',
        adapter: 'mockAdapter',
      });

      expect(
        controller.create({
          data: {
            id: 'mockId2',
            name: 'mockName2',
            description: 'mockDescription2',
            adapter: 'mockAdapter',
          },
        }),
      ).toEqual({ ...res });

      expect(service.create).toHaveBeenCalled();
    });

    it('findAll() | Should return array of "ConversationLogic" objects', () => {
      expect(controller.findAll()).toEqual([
        { ...new mockConversationLogic() },
      ]);

      expect(service.findAll).toHaveBeenCalled();
    });

    it('findOne() | Should return "ConversationLogic" object', () => {
      const res = new mockConversationLogic({});
      res.id = 'mockId2';
      expect(controller.findOne('mockId2')).toEqual({ ...res });
    });

    it('update() | Should return "ConversationLogic" object', () => {
      const res = new mockConversationLogic({
        id: 'mockId',
        name: 'mockName1',
      });
      expect(controller.update('mockId', { name: 'mockName1' })).toEqual({
        ...res,
      });
    });

    it('remove() | Should return "ConversationLogic" object', () => {
      const res = new mockConversationLogic({ id: 'mockId2' });
      expect(controller.remove('mockId2')).toEqual({ ...res });
    });
  });
});
