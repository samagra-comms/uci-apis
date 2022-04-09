import { Test, TestingModule } from '@nestjs/testing';
import { SecretsController } from './secrets.controller';

/**
 * Creates a mock of the secrets service.
 */
let keyValueStore: { [key: string]: any } = {};

const resolvePath = (object, path, defaultValue) =>
  path.split('/').reduce((o, p) => (o ? o[p] : defaultValue), object);

const setNestedProp = (obj = {}, [first, ...rest]: string[], value) => ({
  ...obj,
  [first]: rest.length ? setNestedProp(obj[first], rest, value) : value,
});

const secretServiceMock = {
  setSecret: jest.fn().mockImplementation(async (path, value) => {
    keyValueStore = setNestedProp(keyValueStore, path.split('/'), value);
    return Promise.resolve(null);
  }),
  getSecret: jest.fn().mockImplementation((path, key): Promise<any> => {
    return Promise.resolve(resolvePath(keyValueStore, path + '/' + key, null));
  }),
  getSecretByPath: jest.fn().mockImplementation((path) => {
    return Promise.resolve(resolvePath(keyValueStore, path, null));
  }),
  getAllSecrets: jest.fn().mockImplementation((path) => {
    return Promise.resolve(resolvePath(keyValueStore, path, null));
  }),
  deleteSecret: jest.fn().mockImplementation((path, key) => {
    resolvePath(keyValueStore, path + '/' + key, undefined);
  }),
};

// -----------------------------------------------------------------------

describe('SecretsController', () => {
  let controller: SecretsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretsController],
      providers: [
        {
          provide: 'SecretService',
          useValue: secretServiceMock,
        },
      ],
    }).compile();

    controller = module.get<SecretsController>(SecretsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
