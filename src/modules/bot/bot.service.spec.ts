import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../global-services/prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import stream from 'stream';
import fetchMock from 'fetch-mock';
import {BadRequestException, ConflictException, InternalServerErrorException, NotFoundException, ServiceUnavailableException} from "@nestjs/common";
import { CacheModule } from '@nestjs/common';
import { BotStatus } from '../../../prisma/generated/prisma-client-js';


const MockPrismaService = {
  bot: {
    create: (createData) => {
      const mockBotsDbCopy = JSON.parse(JSON.stringify(mockBotsDb[0]));
      if (createData.data.purpose)
        mockBotsDbCopy.purpose = createData.data.purpose;
      if (createData.data.description)
        mockBotsDbCopy.description = createData.data.description;
      return mockBotsDbCopy;
    },
    findUnique: (filter) => {
      if (filter.where.name === 'testBotNotExisting' || filter.where.id === 'testBotIdNotExisting')
        return null;
      else
        return JSON.parse(JSON.stringify(mockBotsDb[0]));
    },
    findFirst: (filter) => {
      const { name, startingMessage } = filter.where.OR.reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});
      if ((name && name.includes("NotExisting")) && (startingMessage && startingMessage.includes("NotExisting"))) {
        return null;
      }
      return JSON.parse(JSON.stringify(mockBotsDb[0]));
    },
    findMany: (filter) => {
      if (filter.orderBy && filter.orderBy.sortParameter) {
        return 'sortedBots';
      }
      else {
        return JSON.parse(JSON.stringify(mockBotsDb));
      }
    },
    count: () => 10,
    update: jest.fn()
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
      case 'CAFFINE_INVALIDATE_ENDPOINT': return '/testcaffineendpoint';
      case 'AUTHORIZATION_KEY_TRANSACTION_LAYER': return 'testAuthToken';
      case 'BROADCAST_BOT_REPORT_ENDPOINT': return 'testBotReportEndpoint';
      default: return '';
    }
  }
}

const mockCreateBotDto: CreateBotDto & { ownerID: string; ownerOrgID: string } = {
  startingMessage: "Namaste Bot Test",
  name: "TestName",
  users: [],
  logic: [],
  status: BotStatus.ENABLED,
  startDate: "2023-05-4",
  endDate: "2025-12-01",
  purpose: "TestPurpose",
  description: "TestDescription",
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
  "purpose": "TestPurpose",
  "description": "TestDescription",
  "startDate": "2023-05-03T00:00:00.000Z",
  "endDate": "2025-12-01T00:00:00.000Z",
  "status": "ENABLED",
  "tags": [],
  "botImage": "testImageFile",
  "users": [
    {
      "id": "testUserId",
      "createdAt": "2023-05-05T09:26:14.817Z",
      "updatedAt": "2023-05-05T09:26:14.818Z",
      "name": "Testing User Segment - 1",
      "description": null,
      "count": 0,
      "category": null,
      "allServiceID": "testServiceId",
      "byPhoneServiceID": "testPhoneServiceId",
      "byIDServiceID": null,
      "botId": null,
      "all": {
        "id": "testId",
        "createdAt": "2023-05-05T09:25:49.482Z",
        "updatedAt": "2023-05-05T09:25:49.482Z",
        "type": "get",
        "config": {
          "url": "http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot",
          "type": "GET",
          "cadence": {
            "perPage": 1,
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
        },
        "name": null
      }
    }
  ],
  "logicIDs": [
    {
      "id": "testLogicId",
      "name": "Load Test Firebase Broadcast Logic",
      "createdAt": "2023-05-05T09:28:11.910Z",
      "updatedAt": "2023-05-05T09:28:11.911Z",
      "description": null,
      "adapterId": "testAdapterId",
      "transformers": [
        {
          "id": "testTransformerId",
          "createdAt": "2023-05-05T09:28:11.894Z",
          "updatedAt": "2023-05-05T09:28:11.912Z",
          "meta": {
            "body": "Hello ${name}-${phoneNo}, Test Notification",
            "type": "broadcast",
            "title": "Firebase Test Notification",
            "data": {
              "botId": "testConversationBotId"
            },
            "formID": "testFormId",
            "params": [
              "name",
              "phoneNo"
            ],
            "templateType": "JS_TEMPLATE_LITERALS"
          },
          "transformerId": "testTransformerId",
          "conversationLogicId": "testConversationLogicId"
        }
      ],
      "adapter": {
        "id": "testAdapterId",
        "createdAt": "2023-03-18T06:02:41.824Z",
        "updatedAt": "2023-03-18T06:02:41.824Z",
        "channel": "web",
        "provider": "firebase",
        "config": {
          "credentials": {
            "vault": "testVault",
            "variable": "nl-app-firebase-notification"
          }
        },
        "name": "Test Firebase Adapter"
      }
    }
  ]
}];

const mockBotsResolved = [{
  "id": "testId",
  "createdAt": "2023-05-04T19:22:40.768Z",
  "updatedAt": "2023-05-04T19:22:40.769Z",
  "name": "TestName",
  "startingMessage": "Namaste Bot Test",
  "ownerID": null,
  "ownerOrgID": null,
  "purpose": "TestPurpose",
  "description": "TestDescription",
  "startDate": "2023-05-03T00:00:00.000Z",
  "endDate": "2025-12-01T00:00:00.000Z",
  "status": "ENABLED",
  "tags": [],
  "botImage": "testImageUrl",
  "users": [
    {
      "id": "testUserId",
      "createdAt": "2023-05-05T09:26:14.817Z",
      "updatedAt": "2023-05-05T09:26:14.818Z",
      "name": "Testing User Segment - 1",
      "description": null,
      "count": 0,
      "category": null,
      "allServiceID": "testServiceId",
      "byPhoneServiceID": "testPhoneServiceId",
      "byIDServiceID": null,
      "botId": null,
      "all": {
        "id": "testId",
        "createdAt": "2023-05-05T09:25:49.482Z",
        "updatedAt": "2023-05-05T09:25:49.482Z",
        "type": "get",
        "config": {
          "url": "http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot",
          "type": "GET",
          "cadence": {
            "perPage": 1,
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
        },
        "name": null
      }
    }
  ],
  "logicIDs": [
    {
      "id": "testLogicId",
      "name": "Load Test Firebase Broadcast Logic",
      "createdAt": "2023-05-05T09:28:11.910Z",
      "updatedAt": "2023-05-05T09:28:11.911Z",
      "description": null,
      "adapterId": "testAdapterId",
      "transformers": [
        {
          "id": "testTransformerId",
          "createdAt": "2023-05-05T09:28:11.894Z",
          "updatedAt": "2023-05-05T09:28:11.912Z",
          "meta": {
            "body": "Hello ${name}-${phoneNo}, Test Notification",
            "type": "broadcast",
            "title": "Firebase Test Notification",
            "data": {
              "botId": "testConversationBotId"
            },
            "formID": "testFormId",
            "params": [
              "name",
              "phoneNo"
            ],
            "templateType": "JS_TEMPLATE_LITERALS"
          },
          "transformerId": "testTransformerId",
          "conversationLogicId": "testConversationLogicId"
        }
      ],
      "adapter": {
        "id": "testAdapterId",
        "createdAt": "2023-03-18T06:02:41.824Z",
        "updatedAt": "2023-03-18T06:02:41.824Z",
        "channel": "web",
        "provider": "firebase",
        "config": {
          "credentials": {
            "vault": "testVault",
            "variable": "nl-app-firebase-notification"
          }
        },
        "name": "Test Firebase Adapter"
      }
    }
  ]
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
          useValue: MockPrismaService,
        }
      ],
    }).compile();

    botService = module.get<BotService>(BotService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('create bot test', async () => {
    fetchMock.postOnce(`${configService.get<string>('MINIO_MEDIA_UPLOAD_URL')}`, {
      fileName: 'testFileName'
    });
    const mockCreateBotDtoCopy: CreateBotDto & { ownerID: string; ownerOrgID: string } = JSON.parse(JSON.stringify(mockCreateBotDto));
    mockCreateBotDtoCopy.name = 'testBotNotExisting';
    mockCreateBotDtoCopy.startingMessage = 'testBotStartingMessageNotExisting';
    const response = await botService.create(mockCreateBotDtoCopy, mockFile);
    expect(response).toEqual(mockBotsDb[0]);
    fetchMock.restore();
  });

  it('create bot with same name or id throws error', async () => {
    const mockCreateBotDtoCopy: CreateBotDto & { ownerID: string; ownerOrgID: string } = JSON.parse(JSON.stringify(mockCreateBotDto));
    mockCreateBotDtoCopy.name = 'testBotExistingName';
    expect(botService.create(mockCreateBotDtoCopy, mockFile)).rejects
    .toThrowError(new ConflictException("Bot already exists with the following name or starting message!"));
    const mockCreateBotDtoCopy2: CreateBotDto & { ownerID: string; ownerOrgID: string } = JSON.parse(JSON.stringify(mockCreateBotDto));
    mockCreateBotDtoCopy2.startingMessage = 'testBotExistingStartingMessage';
    expect(botService.create(mockCreateBotDtoCopy2, mockFile)).rejects
    .toThrowError(new ConflictException("Bot already exists with the following name or starting message!"));
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

  it('cache is set for bot data findOne', async () => {
    const mockBotId = 'testBotIdExisting';
    botService.cacheManager.get = jest.fn().mockResolvedValue(null);
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}/?fileName=testImageFile`,
      'testImageUrl'
    );
    botService.cacheManager.get = jest.fn().mockResolvedValue(null);
    botService.cacheManager.set = jest.fn();
    await botService.findOne(mockBotId);
    expect(botService.cacheManager.set);
    fetchMock.restore();
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

  it('bot create updates purpose and description in database', async () => {
    fetchMock.postOnce(`${configService.get<string>('MINIO_MEDIA_UPLOAD_URL')}`, {
      fileName: 'testFileName'
    });
    const mockCreateBotDtoCopy: CreateBotDto & { ownerID: string; ownerOrgID: string } = JSON.parse(JSON.stringify(mockCreateBotDto));
    mockCreateBotDtoCopy.name = 'testBotNotExisting';
    mockCreateBotDtoCopy.startingMessage = 'testBotStartingMessageNotExisting';
    mockCreateBotDtoCopy.purpose = 'testPurposeUpdate';
    mockCreateBotDtoCopy.description = 'testDescriptionUpdate';
    const response = await botService.create(mockCreateBotDtoCopy, mockFile);
    const mockBotDbResponse = JSON.parse(JSON.stringify(mockBotsDb[0]));
    mockBotDbResponse.purpose = 'testPurposeUpdate';
    mockBotDbResponse.description = 'testDescriptionUpdate';
    expect(response).toEqual(mockBotDbResponse);
    fetchMock.restore();
  });

  it('bot service returns proper error message on minio image upload failure', async () => {
    fetchMock.postOnce(`${configService.get<string>('MINIO_MEDIA_UPLOAD_URL')}`, () => {
      throw new InternalServerErrorException();
    });
    const mockCreateBotDtoCopy: CreateBotDto & { ownerID: string; ownerOrgID: string } = JSON.parse(JSON.stringify(mockCreateBotDto));
    mockCreateBotDtoCopy.name = 'testBotNotExisting';
    mockCreateBotDtoCopy.startingMessage = 'testBotStartingMessageNotExisting';
    expect(botService.create(mockCreateBotDtoCopy, mockFile)).rejects.toThrowError(new ServiceUnavailableException('Bot image upload failed!'));
  });

  it('bot start passes admin token to segment url', async () => {
    const botId = 'testBotId';
    let submittedToken;
    fetchMock.getOnce('http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot&limit=1&offset=0', (url, options) => {
      if (options.headers) {
        submittedToken = options.headers ? options.headers['conversation-authorization'] : '';
      }
      return {
        data : {
          users: []
        }
      };
    });
    fetchMock.getOnce('http://testSegmentUrl/segments/1/mentors/count', {
      totalCount: 1
    });
    fetchMock.getOnce(`${configService.get('UCI_CORE_BASE_URL')}/campaign/start?campaignId=testBotId&page=1`, (url, options) => {
      submittedToken = options.headers ? options.headers['conversation-authorization'] : '';
      return true;
    });
    await botService.start(botId, mockBotsDb[0].users[0].all.config,'testAuthToken');
    expect(fetchMock.called(`${configService.get('UCI_CORE_BASE_URL')}/campaign/start?campaignId=testBotId&page=1`)).toBe(true);
    expect(submittedToken).toEqual('testAuthToken');
    fetchMock.restore();
  });

  it('bot update throws NotFoundException when non existent bot is updated',async () => {
    fetchMock.getOnce(`${configService.get<string>('UCI_CORE_BASE_URL')}${configService.get<string>('CAFFINE_INVALIDATE_ENDPOINT')}`,
      true
    );
    expect(botService.update('testBotIdNotExisting', {
      'status': 'DISABLED'
    }))
    .rejects
    .toThrowError(new NotFoundException('Bot does not exist!'));
    fetchMock.restore();
  });

  it('bot update calls prisma update', async () => {
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}/?fileName=testImageFile`,
      'testImageUrl'
    );
    fetchMock.deleteOnce(`${configService.get<string>('UCI_CORE_BASE_URL')}${configService.get<string>('CAFFINE_INVALIDATE_ENDPOINT')}`,
      true
    );
    await botService.update('testBotIdExisting', {
      'status': 'DISABLED'
    });
    expect(MockPrismaService.bot.update).toHaveBeenCalled();
    fetchMock.restore();
  });

  it('bot update throws on invalid date format',async () => {
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}/?fileName=testImageFile`,
      'testImageUrl'
    );
    fetchMock.deleteOnce(`${configService.get<string>('UCI_CORE_BASE_URL')}${configService.get<string>('CAFFINE_INVALIDATE_ENDPOINT')}`,
      true
    );
    await expect(botService.update('testBotIdExisting', {
      'endDate': '1129-299-092'
    }))
    .rejects
    .toThrowError(new BadRequestException(`Bad date format. Please provide date in 'yyyy-mm-dd' format.`));
    fetchMock.restore();
  });

  it('bot search passes sortBy parameter to prisma', async () => {
    const resp = await botService.search(
      1,
      1,
      '',
      '',
      true,
      '',
      '',
      'sortParameter',
      'desc'
    );
    expect(resp).toEqual({"data": "sortedBots", "totalCount": 10});
  });

  it('bot update throws on inbound cache invalidate error',async () => {
    fetchMock.getOnce(`${configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}/?fileName=testImageFile`,
      'testImageUrl'
    );
    fetchMock.deleteOnce(`${configService.get<string>('UCI_CORE_BASE_URL')}${configService.get<string>('CAFFINE_INVALIDATE_ENDPOINT')}`, () => {
      throw new InternalServerErrorException();
    });
    await expect(botService.update('testBotIdExisting', {
      'endDate': '2023-10-12'
    }))
    .rejects
    .toThrowError(new ServiceUnavailableException('Could not invalidate cache after update!'));
    fetchMock.restore();
  });

  it('getBotBroadcastConfig returns correct data', async () => {
    expect(await botService.getBotBroadcastConfig('testConversationBotId'))
    .toEqual({
      "bot": {
        "id": "testId",
        "name": "TestName",
        "segment_url": "http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot",
        "form_id": "testFormId",
      }
    })
  })

  it('bot report fetches data correctly', async () => {
    fetchMock.getOnce(
      `${configService.get<string>('UCI_CORE_BASE_URL')}${configService.get<string>('BROADCAST_BOT_REPORT_ENDPOINT')}?botId=testBotId&limit=10&nextPage=testNextPage`,
      true
    );
    await botService.getBroadcastReport('testBotId', 10, 'testNextPage');
    expect(
      fetchMock.called(
        `${configService.get<string>('UCI_CORE_BASE_URL')}${configService.get<string>('BROADCAST_BOT_REPORT_ENDPOINT')}?botId=testBotId&limit=10&nextPage=testNextPage`
      )
    ).toBe(true);
    fetchMock.restore();
  });
});
