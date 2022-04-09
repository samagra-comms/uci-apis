import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { SecretsService } from './secrets.service';
import * as HasuraSecret from './types/hasura.secret';
import * as Headers from './types/headers.secret';
import * as WhatsappGupshup from './types/whatsapp.gupshup.secret';

describe('SecretsService', () => {
  let service: SecretsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretsService, ConfigService],
    }).compile();

    service = module.get<SecretsService>(SecretsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add simple secret to path', async () => {
    await service.setSecret('user1', { key: 'test' });
    const secret = await service.getSecret('user1', 'key');
    expect(secret).toBe('test');
  });

  it('should add hasura secret to path', async () => {
    /**
     * {
     *   "hasuraLocal": {
     *     "baseURL": "http://localhost:8080",
     *     "adminSecret": "4GeEB2JCU5rBdLvQ4AbeqqrPGu7kk9SZDhJUZm7A",
     *    }
     * }
     */
    const hasuraSecretData: HasuraSecret.default = {
      baseURL: 'http://localhost:8080',
      adminSecret: '4GeEB2JCU5rBdLvQ4AbeqqrPGu7kk9SZDhJUZm7A',
    };

    await service.setSecret('user1/hasuraLocal', hasuraSecretData);
    const secret = await service.getSecretByPath('user1/hasuraLocal');
    expect(secret).toStrictEqual(hasuraSecretData);
  });

  it('should add header as secret to path', async () => {
    const headersForService: Headers.default = {
      Authorization: '4GeEB2JCU5rBdLvQ4AbeqqrPGu7kk9SZDhJUZm7A',
    };

    await service.setSecret('user1/headersForService', headersForService);
    const secret = await service.getSecretByPath('user1/headersForService');
    expect(secret).toStrictEqual(headersForService);
  });

  it('should add WA Gupshup as secret to path', async () => {
    const WAGupshupSecret: WhatsappGupshup.default = {
      usernameHSM: 'string',
      passwordHSM: 'string',
      username2Way: 'string',
      password2Way: 'string',
    };

    await service.setSecret('user1/WAGupshupSecret', WAGupshupSecret);
    const secret = await service.getSecretByPath('user1/WAGupshupSecret');
    expect(secret).toStrictEqual(WAGupshupSecret);
  });

  afterAll(async () => {
    // await service.deleteSecret('user1', 'key');
  });
});
