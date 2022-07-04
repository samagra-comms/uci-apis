import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { GQLResolverService } from './gql.resolver';
import { SecretsService } from '../secrets/secrets.service';
import { TelemetryService } from '../../global-services/telemetry.service';
import { createMock } from '@golevelup/ts-jest';
import { User } from './schema/user.dto';
import { ServiceQueryType } from './enum';

describe('SecretsService', () => {
  let service: GQLResolverService;
  let telemetryService: TelemetryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GQLResolverService,
        SecretsService,
        ConfigService,
        {
          provide: TelemetryService,
          useValue: {
            client: {
              capture: jest.fn((data: any) => {
                // console.log('capture called', data);
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<GQLResolverService>(GQLResolverService);
    telemetryService = module.get<TelemetryService>(TelemetryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a valid client even with wrong inputs', () => {
    const client = service.getClient('test', {});
    expect(client.link).toBeDefined();
  });

  it('should notify correctly', async () => {
    // Connected to a Pipedream workflow with the following configuration:
    /*
        https://pipedream.com/@chakshugautam/uci-errorwebhook-workflow-p_3nCeZaq/inspect
        export default defineComponent({
            async run({ steps, $ }) {
                await $.respond({
                status: 200,
                headers: {},
                body: {
                    "status": "Recieved",
                    "user": steps.trigger.event.body?.user,
                },
                })
            }},
        })
    */
    const user: User = {
      id: 'testUserId',
      externalIds: ['test'],
      rootOrgId: '',
    };
    const response = await service.notifyOnError(
      'https://eo3kiu96phwev11.m.pipedream.net',
      user,
      'test Error',
    );
    expect(response).toBeDefined();
    expect(response.user).toEqual(user);
  });

  it('should not notify - send telemetry event', async () => {
    const user: User = {
      id: 'testUserId',
      externalIds: ['test'],
      rootOrgId: '',
    };
    const response = await service.notifyOnError(
      'https://wrong-url.com',
      user,
      'test Error',
    );
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(telemetryService.client.capture).toBeCalledTimes(1);
  });

  it('should get users', async () => {
    const gqlConfig = {
      url: 'https://api.pipedream.com/users',
      query:
        "query Query {users: getUsersByQuery(queryString: \"(((data.userLocation.state : 'Haryana') AND (data.userLocation.district : 'Ambala')) OR ((data.userLocation.state : 'Haryana') AND (data.userLocation.district : 'Panipat') AND (data.userLocation.block : 'Panipat'))) AND (data.roles : PUBLIC) AND (data.userType.type : student)\") {lastName firstName device customData externalIds framework lastName roles rootOrgId userLocation userType}}",
      cadence: {
        perPage: 10000,
        retries: 5,
        timeout: 60,
        concurrent: true,
        pagination: false,
        'retries-interval': 10,
      },
      pageParam: 'page',
      credentials: {
        vault: 'samagra',
        variable: 'dummygql',
      },
      verificationParams: {
        phone: '9415787824',
      },
      errorNotificationWebhook: 'https://eo3kiu96phwev11.m.pipedream.net',
    };
    const users = await service.resolve(
      ServiceQueryType.byPhone,
      gqlConfig,
      'test',
    );
    expect(users).toBeInstanceOf(Array);
  });

  afterAll(async () => {
    return true;
  });
});
