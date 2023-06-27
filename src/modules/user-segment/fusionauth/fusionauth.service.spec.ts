import { Test, TestingModule } from '@nestjs/testing';
import { DeviceManagerService } from './fusionauth.service';
import FusionAuthClient, { ApplicationRequest, RegistrationRequest, UUID } from '@fusionauth/typescript-client';
import { ConfigService } from '@nestjs/config';
import { FusionAuthClientProvider } from './fusionauthClientProvider';


class MockFusionAuthClient {
  callCounter = 0;

  async createApplication(_botID: string, _request: ApplicationRequest): Promise<any> {
    if (this.callCounter == 0) {
      this.callCounter = 1;
      return Promise.reject('Test reject');
    }
    else {
      this.callCounter = 0;
      return Promise.resolve('Test resolve');
    }
  }

  async register(_userId: UUID, _request: RegistrationRequest): Promise<any> {
    if (this.callCounter == 0) {
      this.callCounter = 1;
      return Promise.reject();
    }
    else {
      this.callCounter = 0;
      return { response: { user: { id: 'id', registrations: [ 'test' ] } } };
    }
  }

  async retrieveUserByUsername(username: string): Promise<any> {
    if (username === 'EchWKZTmNFwh9+ScbebnIw==') {
      return { status: true, response: { user: { id : 'id' } } };
    }
    else {
      return { status: false, user: null };
    }
  }

  async retrieveApplication(botId: string): Promise<any> {
    if (botId === 'exists') {
      return { status: true, user: { } };
    }
    else {
      return { status: false, user: null };
    }
  }
}

class MockFusionAuthClientBulkInsertion {
  async createApplication(_botID: string, _request: ApplicationRequest): Promise<any> {
    return Promise.resolve('Test resolve');
  }
}

class MockFusionAuthClientProvider {
  getClient() {
    return new MockFusionAuthClient();
  }
}

class MockFusionAuthClientProviderBulkInsertion {
  getClient() {
    return new MockFusionAuthClientBulkInsertion();
  }
}

class MockConfigService {
  get(envString: string): string {
    switch (envString) {
      case 'FUSIONAUTH_KEY': return 'fusion_auth_key';
      case 'FUSIONAUTH_URL': return 'http://fusion_auth_url';
      case 'FUSIONAUTH_ANONYMOUS_BOT_APP_ID': return 'anonymous_id';
      case 'ENCRYPTION_KEY': return 'encryption_key';
      default: return '';
    }
  }
}

describe('FormController', () => {
  let deviceManagerService: DeviceManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceManagerService,
        FusionAuthClientProvider, {
          provide: FusionAuthClientProvider,
          useClass: MockFusionAuthClientProvider,
        },
        ConfigService, {
            provide: ConfigService,
            useClass: MockConfigService,
        },
        FusionAuthClient, {
            provide: FusionAuthClient,
            useClass: MockFusionAuthClient,
        }
      ]
    }).compile();

    deviceManagerService = module.get<DeviceManagerService>(DeviceManagerService);
  });

  it('fusionauth client retries', async () => {
    await deviceManagerService.addBotToRegistry('testBotId');
    await deviceManagerService.addDeviceToRegistry('exists', { device : { type: 'exist', deviceID: 'test' } });
    await deviceManagerService.addDeviceToRegistry('exists', { device : { type: 'doesNotExist', deviceID: 'test' } });
  }, 20000);
});

describe('DeviceManagerService', () => {
  let deviceManagerService: DeviceManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceManagerService,
        FusionAuthClientProvider,
        {
          provide: FusionAuthClientProvider,
          useClass: MockFusionAuthClientProviderBulkInsertion,
        },
        ConfigService,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
    }).compile();

    deviceManagerService = module.get<DeviceManagerService>(DeviceManagerService);
  });

  it('should add multiple bots to the registry', async () => {
    const botIDs = ['bot0', 'bot1', 'bot2', 'bot3', 'bot4', 'bot5', 'bot6', 'bot7', 'bot8', 'bot9', 'bot10'];
    await expect(deviceManagerService.addBotsToRegistry(botIDs)).resolves.toBeUndefined();
  }, 60000);
});
