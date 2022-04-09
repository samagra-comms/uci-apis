import { KVVaultClient, Vault } from '@mittwald/vaults';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretsService {
  client: Vault;
  KVClient: KVVaultClient;
  KVPath = 'kv';

  initClient(vaultAddress: string, vaultToken: string) {
    this.client = new Vault({
      vaultAddress,
      vaultToken,
    });
    this.KVClient = this.client.KV(1, this.KVPath);
  }

  constructor(private configService: ConfigService) {
    this.initClient(
      this.configService.get<string>('VAULT_ADDR') || '',
      this.configService.get<string>('VAULT_TOKEN') || '',
    );
  }

  async getSecret(path: string, key: string) {
    const consolidatedPath = path;
    const kvPairs = await this.KVClient.read(consolidatedPath);
    return kvPairs.data[key];
  }

  async getSecretByPath(path: string): Promise<any> {
    const kvPairs = await this.KVClient.read(path);
    return kvPairs.data;
  }

  async setSecret(path: string, value: { [key: string]: string }) {
    return await this.KVClient.create(path, value);
  }

  async getAllSecrets(path: string): Promise<any> {
    return await this.KVClient.list(path);
  }

  async deleteSecret(path: string, key: string) {
    await this.KVClient.delete(path);
  }
}
