import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './global-services/prisma.service';

class PrismaServiceMock {
  bots = {
    count: jest.fn().mockResolvedValue(42),
  };
}

describe.skip('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('/getBotCount', () => {
    it('should return the bot count from AppService', async () => {
      const mockBotCount = 42;
      jest.spyOn(appService, 'getBotCount').mockResolvedValue(mockBotCount);
      const response = await appController.getBotCount();
      expect(response).toEqual({ data: mockBotCount });
    });
  });
});