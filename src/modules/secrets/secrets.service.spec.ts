import { Test } from '@nestjs/testing';
import { SecretsService } from './secrets.service';
import { VaultClientProvider } from './secrets.service.provider';

describe('SecretsService', () => {
  let secretsService: SecretsService;
  let vaultClientProvider: VaultClientProvider;
  let vaultClient: any;

  beforeEach(async () => {
    vaultClient = {
      read: jest.fn(),
      list: jest.fn(),
      write: jest.fn(),
      clear: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SecretsService,
        {
          provide: VaultClientProvider,
          useValue: {
            getClient: jest.fn(() => vaultClient),
          },
        },
      ],
    }).compile();

    secretsService = moduleRef.get<SecretsService>(SecretsService);
    vaultClientProvider = moduleRef.get<VaultClientProvider>(VaultClientProvider);
  });

  describe('getSecret', () => {
    it('should return the secret value for the given path and key', async () => {
      const path = 'path';
      const key = 'key';
      const secretValue = 'secret';

      vaultClient.read.mockResolvedValueOnce({ __data: { [key]: secretValue } });

      const result = await secretsService.getSecret(path, key);

      expect(result).toEqual(secretValue);
      expect(vaultClientProvider.getClient).toHaveBeenCalled();
      expect(vaultClient.read).toHaveBeenCalledWith(`kv/${path}`);
    });
  });

  describe('getSecretByPath', () => {
    it('should return all secrets for the given path', async () => {
      const path = 'path';
      const secrets = { key1: 'secret1', key2: 'secret2' };

      vaultClient.read.mockResolvedValueOnce({ __data: secrets });

      const result = await secretsService.getSecretByPath(path);

      expect(result).toEqual(secrets);
      expect(vaultClientProvider.getClient).toHaveBeenCalled();
      expect(vaultClient.read).toHaveBeenCalledWith(`kv/${path}`);
    });
  });

  describe('setSecret', () => {
    it('should write the given secret value to the specified path', async () => {
      const path = 'path';
      const secretValue = { key: 'value' };

      vaultClient.write.mockResolvedValueOnce();

      const result = await secretsService.setSecret(path, secretValue);

      expect(result).toBeUndefined();
      expect(vaultClientProvider.getClient).toHaveBeenCalled();
      expect(vaultClient.write).toHaveBeenCalledWith(`kv/${path}`, secretValue);
    });
  });

  describe('getAllSecrets', () => {
    it('should return all secrets under the given path', async () => {
      const path = 'path';
      const keys = ['key1', 'key2'];
      const secrets = { key1: 'secret1', key2: 'secret2' };

      vaultClient.list.mockResolvedValueOnce({ data: { keys } });
      vaultClient.read.mockImplementation(async (p) => ({ __data: secrets[p.split('/').pop()] }));

      const result = await secretsService.getAllSecrets(path);

      expect(result).toEqual([
        { key1: 'secret1' },
        { key2: 'secret2' },
      ]);
      expect(vaultClientProvider.getClient).toHaveBeenCalled();
      expect(vaultClient.list).toHaveBeenCalledWith(path);
      expect(vaultClient.read).toHaveBeenCalledTimes(2);
      expect(vaultClient.read).toHaveBeenNthCalledWith(1, `kv/${path}/key1`);
      expect(vaultClient.read).toHaveBeenCalledWith(`kv/${path}/key2`);
    });
  });
});
