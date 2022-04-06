import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../global-services/prisma.service';
import { AddOwnerInfoInterceptor } from './addOwnerInfo.interceptor';

describe('VerifyOwnerMiddleware', () => {
  let middleware: AddOwnerInfoInterceptor;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddOwnerInfoInterceptor, PrismaService],
    }).compile();

    middleware = module.get<AddOwnerInfoInterceptor>(AddOwnerInfoInterceptor);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should verify request as authorized"', async () => {
    prisma.bot.findUnique = jest
      .fn()
      .mockReturnValueOnce([
        { id: '95244f48-b583-11ec-b909-0242ac120002', name: 'TestBot' },
      ]);
  });
});
