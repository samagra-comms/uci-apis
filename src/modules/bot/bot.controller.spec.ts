import { Test, TestingModule } from '@nestjs/testing';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../global-services/prisma.service';
import { GQLResolverService } from '../service/gql.resolver';
import { GetRequestResolverService } from '../service/http-get.resolver';
import { PostRequestResolverService } from '../service/http-post.resolver';
import { SecretsService } from '../secrets/secrets.service';
import { TelemetryService } from '../../global-services/telemetry.service';
import { ServiceService } from '../service/service.service';
import { DeviceManagerService } from '../user-segment/fusionauth/fusionauth.service';
import { BotStatus, Prisma } from '../../../prisma/generated/prisma-client-js';
import { FusionAuthClientProvider } from '../user-segment/fusionauth/fusionauthClientProvider';
import { BadRequestException, CacheModule, ServiceUnavailableException } from '@nestjs/common';
import { VaultClientProvider } from '../secrets/secrets.service.provider';

class MockPrismaService {
  bot = {
    findUnique: (filter) => {
      if (filter.where.name === 'testBotNotExisting' || filter.where.id === 'testBotIdNotExisting') {
        return null;
      }
      const mockBotDataCopy = JSON.parse(JSON.stringify(mockBotData));
      if (filter.where.id == 'disabled') {
        mockBotDataCopy['status'] = BotStatus.DISABLED;
      }
      if (filter.where.id == 'noUser') {
        mockBotDataCopy['users'] = []
      }
      return mockBotDataCopy;
    },
  }
}

class MockConfigService {
  get(envString: string): string {
    switch (envString) {
      case 'MINIO_MEDIA_UPLOAD_URL': return 'http://minio_upload_url';
      case 'ODK_BASE_URL': return 'http://odk_form_upload_url';
      case 'TRANSFORMER_BASE_URL': return 'http://transformer_base_url';
      case 'UCI_CORE_BASE_URL': return 'http://uci_core_base_url';
      case 'POSTHOG_API_KEY': return 'POSTHOG_KEY';
      case 'VAULT_TOKEN': return 'testVaultToken';
      case 'VAULT_ADDR': return 'testVaultAddress';
      default: return '';
    }
  }
}

const mockBotService = {
  findOne: jest.fn((id: string) => {
    if (id === 'testBotIdNotExisting') {
      return null;
    }
    const mockBotDataCopy = JSON.parse(JSON.stringify(mockBotData));
    if (id == 'disabled') {
      mockBotDataCopy['status'] = BotStatus.DISABLED;
    }
    else if (id == 'enabled') {
      mockBotDataCopy['status'] = BotStatus.ENABLED;
    }
    else if (id == 'pinned') {
      mockBotDataCopy['status'] = BotStatus.PINNED;
    }
    if (id == 'noUser') {
      mockBotDataCopy['users'] = []
    }
    return mockBotDataCopy;
  }),

  update: jest.fn((id: string, updateBotDto: any) => {
    let resp: boolean = true;
    Object.entries(updateBotDto).reduce((acc, [key, value]) => {
      if (!updateParametersPassed.includes(key)) {
        resp = false;
      }
      return acc;
    }, {});
    return resp;
  }),

  getBotBroadcastConfig: jest.fn(() => {
    return {
      "bot": {
        "id": "23293u42309423eacsdfsdf",
        "name": "bot name",
        "segment_url": "segment_url",
        "form_id": "form_id",
      }
    };
  }),

  getBroadcastReport: jest.fn(),

  start: jest.fn(),
}

const mockBotData: Prisma.BotGetPayload<{
  include: {
    users: {
      include: {
        all: true;
      };
    };
    logicIDs: {
      include: {
        transformers: true;
        adapter: true;
      };
    };
  };
}> = {
  "id": "testBotId",
  "createdAt": new Date("2023-05-05T09:28:42.633Z"),
  "updatedAt": new Date("2023-05-05T09:28:42.633Z"),
  "name": "Testing Bot",
  "startingMessage": "Hi Testing",
  "ownerID": "testOwnerId",
  "ownerOrgID": "testOrgId",
  "purpose": null,
  "description": null,
  "startDate": new Date("2023-03-01T00:00:00.000Z"),
  "endDate": new Date("20org0124-12-01T00:00:00.000Z"),
  "status": "ENABLED",
  "tags": [],
  "botImage": 'testBotImage',
  "meta": {},
  "users": [
    {
      "id": "testUserId",
      "createdAt": new Date("2023-05-05T09:26:14.817Z"),
      "updatedAt": new Date("2023-05-05T09:26:14.818Z"),
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
        "createdAt": new Date("2023-05-05T09:25:49.482Z"),
        "updatedAt": new Date("2023-05-05T09:25:49.482Z"),
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
      "createdAt": new Date("2023-05-05T09:28:11.910Z"),
      "updatedAt": new Date("2023-05-05T09:28:11.911Z"),
      "description": null,
      "adapterId": "testAdapterId",
      "transformers": [
        {
          "id": "testTransformerId",
          "createdAt": new Date("2023-05-05T09:28:11.894Z"),
          "updatedAt": new Date("2023-05-05T09:28:11.912Z"),
          "meta": {
            "body": "Hello ${name}-${phoneNo}, Test Notification",
            "type": "broadcast",
            "title": "Firebase Test Notification",
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
        "createdAt": new Date("2023-03-18T06:02:41.824Z"),
        "updatedAt": new Date("2023-03-18T06:02:41.824Z"),
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
};

const botUpdateValidParameters = [
  "startingMessage",
  "name",
  "tags",
  "users",
  "logicIDs",
  "status",
  "endDate",
  "ownerID",
  "ownerOrgID",
  "purpose",
  "description"
];

let updateParametersPassed: string[] = [];

describe('BotController', () => {
  let botController: BotController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
      imports: [CacheModule.register({})],
      providers: [
        GQLResolverService,
        GetRequestResolverService,
        PostRequestResolverService,
        SecretsService,
        ServiceService,
        FusionAuthClientProvider,
        DeviceManagerService,
        TelemetryService,
        VaultClientProvider,
        ConfigService, {
          provide: ConfigService,
          useClass: MockConfigService,
        },
        PrismaService, {
          provide: PrismaService,
          useClass: MockPrismaService,
        },
        BotService, {
          provide: BotService,
          useValue: mockBotService,
        }
      ],
    }).compile();

    botController = module.get<BotController>(BotController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('bot start returns bad request on non existent bot', async () => {
    expect(botController.startOne('testBotIdNotExisting', {})).rejects.toThrowError(new BadRequestException('Bot does not exist'));
  });

  it('bot start returns bad request when bot does not have user data', async () => {
    expect(botController.startOne('noUser', {})).rejects.toThrowError(new BadRequestException('Bot does not contain user segment data'));
  });

  it('disabled bot returns unavailable error',async () => {
    await expect(() => botController.startOne('disabled', {})).rejects.toThrowError(ServiceUnavailableException);
  });

  it('only disabled bot returns unavailable error',async () => {
    expect(botController.startOne('pinned', {})).resolves;
    expect(botController.startOne('enabled', {})).resolves;
  });

  it('update only passes relevant bot data to bot service', async () => {
    updateParametersPassed = [
      'status',
      'tags'
    ];
    const resp = await botController.update('testBotId', {
      'irrelevant_parameter1': 'test',
      'irrelevant_parameter2': 'test',
      'status': 'test',
      'tags': 'test',
      'irrelevant_parameter3': 'test',
    });
    expect(resp).toBeTruthy();
    updateParametersPassed = [];
  });

  it('search throws error on unknown search fields', async () => {
    expect(botController.search(
      '1',
      '1',
      '',
      '',
      'true',
      'nonExistent',
      'desc',
      {}
    ))
    .rejects
    .toThrowError(new BadRequestException(`sorting by 'nonExistent' is not supported!`));
  });

  it('search throws error on unknown orderBy value', async () => {
    expect(botController.search(
      '1',
      '1',
      '',
      '',
      'true',
      'name',
      //@ts-ignore
      'nonExistent',
      {}
    ))
    .rejects
    .toThrowError(new BadRequestException(`Only asc | desc values are supported in 'orderBy' field!`));
  });

  it('bot config calls getBotBroadcastConfig',async () => {
    expect(await botController.getBotConfig('testId')).toEqual({
      "bot": {
        "id": "23293u42309423eacsdfsdf",
        "name": "bot name",
        "segment_url": "segment_url",
        "form_id": "form_id",
      }
    });
    expect(mockBotService.getBotBroadcastConfig).toHaveBeenCalled();
  });

  it('bot report calls getBroadcastReport', async () => {
    await botController.getBroadcastReport(
      'testId',
      10,
      'next'
    );
    expect(mockBotService.getBroadcastReport).toHaveBeenCalled();
  })

  it('bot report throws on undefined botId', async () => {
    expect(botController.getBroadcastReport(
      '',
      10,
      ''
    ))
    .rejects
    .toThrowError(new BadRequestException(`'botId' is required!`));
  });

  it('update passes meta', async () => {
    updateParametersPassed = [
      'meta',
    ];
    const resp = await botController.update('testBotId', {
      'meta': {'myKey': 'myValue'}
    });
    expect(resp).toBeTruthy();
    updateParametersPassed = [];
  });
});
