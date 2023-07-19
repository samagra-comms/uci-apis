import { Test, TestingModule } from '@nestjs/testing';
import { SecretDTO } from './secret.dto';
import { SecretsController } from './secrets.controller';
import { SecretType } from './types';
import { SecretsService } from './secrets.service';
// import { KVVaultClient, Vault } from '@mittwald/vaults';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { SecretsModule } from './secrets.module';
import { PrismaService } from '../../global-services/prisma.service';

let keyValueStore: { [key: string]: any } = {};

// GET /secret/:variableName
const resolvePath = (object, path, defaultValue) =>
  path.split('/').reduce((o, p) => (o ? o[p] : defaultValue), object);

// SET /secret/:variableName
const setNestedProp = (obj = {}, [first, ...rest]: string[], value) => ({
  ...obj,
  [first]: rest.length ? setNestedProp(obj[first], rest, value) : value,
});

// <-------- This was the previous mock implementation for the secret service using "@mittwald/vaults" package but the service was rewritten using a different package. This implementation and subsequest tests are needed to be fixed -------->

// const SecretsServiceMock: SecretsService = {
//   client: createMock<Vault>(),
//   KVClient: createMock<KVVaultClient>(),
//   KVPath: '',
//   initClient: function (vaultAddress: string, vaultToken: string): void {
//     throw new Error('Function not implemented.');
//   },
//   configService: createMock<ConfigService>(),

//   setSecret: async (path, value): Promise<any> => {
//     keyValueStore = setNestedProp(keyValueStore, path.split('/'), value);
//     return Promise.resolve(null);
//   },
//   getSecret: async (path, key): Promise<any> => {
//     return Promise.resolve(resolvePath(keyValueStore, path + '/' + key, null));
//   },
//   getSecretByPath: async (path): Promise<any> => {
//     return Promise.resolve(resolvePath(keyValueStore, path, null));
//   },
//   getAllSecrets: async (path): Promise<any> => {
//     return Promise.resolve(resolvePath(keyValueStore, path, null));
//   },
//   deleteSecret: async (path): Promise<boolean> => {
//     Promise.resolve(resolvePath(keyValueStore, path, undefined));
//     return true;
//   },
//   deleteAllSecrets: function (path: any): Promise<any> {
//     throw new Error('Function not implemented.');
//   },
// };

describe.skip('SecretsController', () => {
  let app: INestApplication;
  let controller: SecretsController;
  let secretService: SecretsService;

  // beforeAll(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [SecretsModule],
  //     providers: [
  //       {
  //         provide: 'SecretsService',
  //         useValue: SecretsServiceMock,
  //       },
  //       {
  //         provide: 'ConfigService',
  //         useValue: createMock<ConfigService>(),
  //       },
  //       {
  //         provide: 'PrismaService',
  //         useValue: createMock<PrismaService>(),
  //       },
  //     ],
  //   })
  //     .overrideProvider(SecretsService)
  //     .useValue(SecretsServiceMock)
  //     .overrideProvider(ConfigService)
  //     .useValue(createMock<ConfigService>())
  //     .overrideProvider(PrismaService)
  //     .useValue(createMock<PrismaService>())
  //     .compile();

  //   app = module.createNestApplication();
  //   await app.init();

  //   controller = module.get<SecretsController>(SecretsController);
  //   secretService = module.get<any>('SecretsService');
  //   secretService.setSecret('/secret/key1/key2/key3', { key: 'value3' });
  // });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should add a secret on API call', async () => {
  //   const secret: SecretDTO = {
  //     secretBody: {
  //       usernameHSM: 'a',
  //       passwordHSM: 'b',
  //       username2Way: 'c',
  //       password2Way: 'd',
  //     },
  //     ownerId: 'test',
  //     type: SecretType.WhatsappGupshup,
  //     variableName: '21',
  //   };
  //   await controller.create(secret);
  //   const response = await controller.findOne(secret.variableName, {
  //     ownerId: secret.ownerId,
  //   });
  //   expect(JSON.stringify(response)).toBe(
  //     JSON.stringify({ [secret.variableName]: secret.secretBody }),
  //   );
  // });

  // it('should delete a secret on API call', async () => {
  //   const secret: SecretDTO = {
  //     secretBody: {
  //       usernameHSM: 'a',
  //       passwordHSM: 'b',
  //       username2Way: 'c',
  //       password2Way: 'd',
  //     },
  //     ownerId: 'test',
  //     type: SecretType.WhatsappGupshup,
  //     variableName: '21',
  //   };
  //   const response = await controller.deleteAll(secret.variableName, {
  //     ownerId: secret.ownerId,
  //   });
  //   expect(response).toBe(true);
  // });
});
