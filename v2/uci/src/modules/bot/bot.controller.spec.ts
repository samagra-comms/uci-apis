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
import { Prisma } from 'prisma/generated/prisma-client-js';
import fetchMock from 'fetch-mock';

class MockPrismaService {
  bot = {
    findUnique: () => {
      return mockBotData;
    },
  }
}

class mockConfigService {
  get(envString: string): string {
    switch (envString) {
      case 'MINIO_MEDIA_UPLOAD_URL': return 'http://minio_upload_url';
      case 'ODK_BASE_URL': return 'http://odk_form_upload_url';
      case 'TRANSFORMER_BASE_URL': return 'http://transformer_base_url';
      case 'UCI_CORE_BASE_URL': return 'http://uci_core_base_url';
      case 'POSTHOG_API_KEY': return 'POSTHOG_KEY';
      default: return '';
    }
  }
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
  "botImage": null,
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

describe('BotController', () => {
  let botController: BotController;
  let configService: ConfigService;

  beforeEach(async () => {
    jest.setTimeout(30000);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
      providers: [
        BotService,
        GQLResolverService,
        GetRequestResolverService,
        PostRequestResolverService,
        SecretsService,
        ServiceService,
        DeviceManagerService,
        TelemetryService,
        ConfigService, {
          provide: ConfigService,
          useClass: mockConfigService,
        },
        PrismaService, {
          provide: PrismaService,
          useClass: MockPrismaService,
        }
      ],
    }).compile();

    botController = module.get<BotController>(BotController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('bot start passes admin token to segment url', async () => {
    const headers = {'admin-token': 'testAuthToken'};
    const botId = 'testBotId';
    let submittedToken;
    fetchMock.getOnce('http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot&limit=1&offset=0', (url, options) => {
      if (options.headers) {
        submittedToken = new Headers(options.headers).get('admin-token');
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
      submittedToken = new Headers(options.headers).get('admin-token');
      return true;
    });
    await botController.startOne(botId, headers);
    expect(fetchMock.called(`${configService.get('UCI_CORE_BASE_URL')}/campaign/start?campaignId=testBotId&page=1`)).toBe(true);
    expect(submittedToken).toEqual('testAuthToken');
    submittedToken = '';
    await botController.getAllUsers(botId, headers, 1);
    expect(fetchMock.called('http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot&limit=1&offset=0')).toBe(true);
    expect(submittedToken).toEqual('testAuthToken');
    fetchMock.restore();
  });
});
