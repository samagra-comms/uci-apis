import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../global-services/prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import stream from 'stream';
import fetchMock from 'fetch-mock';


class MockPrismaService {
  bot = {
    create: () => {
      return 'testBotCreated';
    },
    findUnique: () => {
      return null;
    },
    findMany: () => {
      return mockBotsDb;
    }
  }
}

const mockCreateBotDto: CreateBotDto & { ownerID: string; ownerOrgID: string } = {
  startingMessage: "Namaste Bot Test",
  name: "TestName",
  users: [],
  logic: [],
  status: "enabled",
  startDate: "2023-05-4",
  endDate: "2025-12-01",
  ownerid: "",
  ownerorgid: "",
  tags: [],
  ownerID: "",
  ownerOrgID: "",
};

const mockFile: Express.Multer.File = {
  fieldname: 'testField',
  originalname: 'test.txt',
  encoding: '7bit',
  mimetype: 'text/plain',
  size: 100,
  destination: '/tmp',
  filename: 'test-1234.txt',
  path: '/tmp/test-1234.txt',
  buffer: Buffer.from('test data'),
  stream: new stream.Readable({
    read() {
      this.push(mockFile.buffer);
      this.push(null);
    }
  })
};

const mockBotsDb = [{
  "id": "testId",
  "createdAt": "2023-05-04T19:22:40.768Z",
  "updatedAt": "2023-05-04T19:22:40.769Z",
  "name": "TestName",
  "startingMessage": "Namaste Bot Test",
  "ownerID": null,
  "ownerOrgID": null,
  "purpose": null,
  "description": null,
  "startDate": "2023-05-03T00:00:00.000Z",
  "endDate": "2025-12-01T00:00:00.000Z",
  "status": "ENABLED",
  "tags": [],
  "botImage": "testImageFile",
  "users": [],
  "logicIDs": []
}];

const mockBotsResolved = [{
  "id": "testId",
  "createdAt": "2023-05-04T19:22:40.768Z",
  "updatedAt": "2023-05-04T19:22:40.769Z",
  "name": "TestName",
  "startingMessage": "Namaste Bot Test",
  "ownerID": null,
  "ownerOrgID": null,
  "purpose": null,
  "description": null,
  "startDate": "2023-05-03T00:00:00.000Z",
  "endDate": "2025-12-01T00:00:00.000Z",
  "status": "ENABLED",
  "tags": [],
  "botImage": "testImageUrl",
  "users": [],
  "logicIDs": []
}];

describe('BotService', () => {
  let botService: BotService;
  let configService: ConfigService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        ConfigService,
        PrismaService, {
          provide: PrismaService,
          useClass: MockPrismaService,
        }
      ],
    }).compile();

    botService = module.get<BotService>(BotService);
    configService = module.get<ConfigService>(ConfigService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('create bot test', async () => {
    fetchMock.postOnce(`${configService.get<string>('MINIO_MEDIA_UPLOAD_URL')}`, {
      fileName: 'testFileName'
    });
    const response = await botService.create(mockCreateBotDto, mockFile);
    expect(response).toEqual('testBotCreated');
    fetchMock.restore();
  });

  it('get bot data test', async () => {
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}?fileName=testImageFile`,
      'testImageUrl'
    );
    const response = await botService.findAllContextual(null, null);
    expect(response).toEqual(mockBotsResolved);
  });
});
