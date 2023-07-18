import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { GetRequestResolverService } from './http-get.resolver';
import { GQLResolverService } from './gql.resolver';
import { ConfigService } from '@nestjs/config';
import { SecretsService } from '../secrets/secrets.service';
import { TelemetryService } from '../../global-services/telemetry.service';
import { VaultClientProvider } from '../secrets/secrets.service.provider';
import fetchMock from 'fetch-mock';

class MockConfigService {
  get(envString: string): string {
    switch (envString) {
      case 'MINIO_MEDIA_UPLOAD_URL': return 'http://minio_upload_url';
      case 'MINIO_GET_SIGNED_FILE_URL': return 'http://minio_file_signed_url';
      case 'ODK_BASE_URL': return 'http://odk_form_upload_url';
      case 'TRANSFORMER_BASE_URL': return 'http://transformer_base_url';
      case 'UCI_CORE_BASE_URL': return 'http://uci_core_base_url';
      case 'POSTHOG_API_KEY': return 'testPostHogKey';
      default: return '';
    }
  }
}

class MockVaultClientProvider {
  getClient() {
    return {
      read() {
        return {
          __data: []
        }
      },
      write() {

      },
      list() {
        return {
          __data: []
        }
      }
    }
  }
}

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

describe('ServiceService', () => {
  let serviceService: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        GetRequestResolverService,
        GQLResolverService,
        SecretsService,
        TelemetryService,
        VaultClientProvider, {
          provide: VaultClientProvider,
          useClass: MockVaultClientProvider,
        },
        ConfigService, {
          provide: ConfigService,
          useClass: MockConfigService
        },
      ],
    }).compile();

    serviceService = module.get<ServiceService>(ServiceService);
  });

  it('service passes conversation authorization header', async () => {
    let submittedToken: string | null = '';
    fetchMock.getOnce('http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot&limit=1&offset=0', (url, options) => {
      if (options.headers) {
        submittedToken = new Headers(options.headers).get('conversation-authorization');
      }
      return {
        data : {
          users: []
        }
      };
    });
    await serviceService.resolve(mockBotsDb[0].users[0].all, 1, mockBotsDb[0].ownerID, 'testAuthToken');
    expect(fetchMock.called('http://testSegmentUrl/segments/1/mentors?deepLink=nipunlakshya://chatbot&limit=1&offset=0')).toBe(true);
    expect(submittedToken).toEqual('testAuthToken');
    fetchMock.restore();
  });
});
