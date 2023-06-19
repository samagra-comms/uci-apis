import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../global-services/prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import stream from 'stream';
import fetchMock from 'fetch-mock';
import {CACHE_MANAGER} from "@nestjs/common";
import { CacheModule } from '@nestjs/common';


class MockPrismaService {
  bot = {
    create: () => {
      return 'testBotCreated';
    },
    findUnique: (filter) => {
      if (filter.where.name === 'testBotNotExisting' || filter.where.id === 'testBotIdNotExisting')
        return null;
      else
        return JSON.parse(JSON.stringify(mockBotsDb[0]));
    },
    findMany: () => {
      return JSON.parse(JSON.stringify(mockBotsDb));
    }
  }
}

class MockConfigService {
  get(envString: string): string {
    switch (envString) {
      case 'MINIO_MEDIA_UPLOAD_URL': return 'http://minio_upload_url';
      case 'MINIO_GET_SIGNED_FILE_URL': return 'http://minio_file_signed_url';
      case 'ODK_BASE_URL': return 'http://odk_form_upload_url';
      case 'TRANSFORMER_BASE_URL': return 'http://transformer_base_url';
      case 'UCI_CORE_BASE_URL': return 'http://uci_core_base_url';
      default: return '';
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

const mockConfig = {
  "url": "http://mytesturl?",
  "type": "GET",
  "cadence": {
    "perPage": 20,
    "retries": 5,
    "timeout": 60,
    "concurrent": true,
    "pagination": true,
    "concurrency": 10,
    "retries-interval": 10
  },
  "pageParam": "page",
  "credentials": {},
  "totalRecords": 1
};

describe('BotService', () => {
  let botService: BotService;
  let configService: ConfigService;
  let prismaService: PrismaService;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      providers: [
        BotService,
        ConfigService, {
          provide: ConfigService,
          useClass: MockConfigService
        },
        PrismaService, {
          provide: PrismaService,
          useClass: MockPrismaService,
        }
      ],
    }).compile();

    botService = module.get<BotService>(BotService);
    configService = module.get<ConfigService>(ConfigService);
    prismaService = module.get<PrismaService>(PrismaService);
    cacheManager = module.get<any>(CACHE_MANAGER);
  });

  it('create bot test', async () => {
    fetchMock.postOnce(`${configService.get<string>('MINIO_MEDIA_UPLOAD_URL')}`, {
      fileName: 'testFileName'
    });
    const mockCreateBotDtoCopy: CreateBotDto & { ownerID: string; ownerOrgID: string } = JSON.parse(JSON.stringify(mockCreateBotDto));
    mockCreateBotDtoCopy.name = 'testBotNotExisting';
    const response = await botService.create(mockCreateBotDtoCopy, mockFile);
    expect(response).toEqual('testBotCreated');
    fetchMock.restore();
  });

  it('get bot all data test', async () => {
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}?fileName=testImageFile`,
      'testImageUrl'
    );
    const response = await botService.findAllContextual(null, null);
    expect(response).toEqual(mockBotsResolved);
    fetchMock.restore();
  });

  it('bot picks totalCount from config url', async () => {
    fetchMock.getOnce('http://mytesturl/count', {
      totalCount: 100
    });
    for (let x = 1; x <= 5; x++) {
      fetchMock.getOnce(
        `${configService.get('UCI_CORE_BASE_URL')}/campaign/start?campaignId=${'testId'}&page=${x}`,
        ''
      );
    }
    await botService.start('testId', mockConfig, 'testAuthToken');
    for (let x = 1; x <= 5; x++) {
      expect(fetchMock.called(
        `${configService.get('UCI_CORE_BASE_URL')}/campaign/start?campaignId=${'testId'}&page=${x}`
      )).toBe(true);
    }
    fetchMock.restore();
  });

  it('caches bot data', async () => {
    const mockCachedBots = [{ id: 'testId', name: 'TestBot' }];
    const cacheKey = 'bots_null_null';
    botService.cacheManager.get = jest.fn().mockResolvedValue(mockCachedBots);
    const result = await botService.findAllContextual(null, null);
    expect(botService.cacheManager.get).toHaveBeenCalledWith(cacheKey);
    expect(result).toEqual(mockCachedBots);
  });
  
  it('caches bot data for findOne', async () => {
    const mockBotId = 'testId';
    const mockBotData = {
      id: mockBotId,
      name: 'TestBot',
      users: [{ id: 'user1', name: 'User1' }],
      logicIDs: [{ id: 'logic1', transformers: [], adapter: {} }]
    };
    const cacheKey = `bot_${mockBotId}`;
    botService.cacheManager.get = jest.fn().mockResolvedValue(mockBotData);
    const result = await botService.findOne(mockBotId);
    expect(botService.cacheManager.get).toHaveBeenCalledWith(cacheKey);
    expect(result).toEqual(mockBotData);
  });

  it('get single bot data test', async () => {
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}/?fileName=testImageFile`,
      'testImageUrl'
    );
    const response = await botService.findOne('testBotIdExisting');
    expect(response).toEqual(mockBotsResolved[0]);
    fetchMock.restore();
  });

  it('get single bot data returns null image when minio request fails', async () => {
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}/?fileName=testImageFile`,
      () => { throw new Error(); }
    );
    const response = await botService.findOne('testBotIdExisting');
    const mockBotResolvedCopy = JSON.parse(JSON.stringify(mockBotsResolved[0]));
    mockBotResolvedCopy.botImage = null;
    expect(response).toEqual(mockBotResolvedCopy);
    fetchMock.restore();
  });
});
