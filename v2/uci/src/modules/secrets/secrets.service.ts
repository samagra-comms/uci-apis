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

  constructor(public configService: ConfigService) {
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
    console.log('getSecretByPath method called');
    const kvPairs = await this.KVClient.read(path);
    return kvPairs.data;
  }

  async setSecret(path: string, value: { [key: string]: string }) {
    console.log('method called');
    return await this.KVClient.create(path + '/', value);
  }

  async getAllSecrets(path: string): Promise<any> {
    const data: any[] = [];
    try {
      const keys = await (await this.KVClient.list(path)).data.keys;
      for (const key of keys) {
        const dataAtKey = await this.getSecretByPath(path + '/' + key);
        data.push({ [`${key}`]: dataAtKey });
      }
    } catch (e) {
      console.log(e);
    }

    return data;
  }

  async deleteSecret(path: string) {
    await this.KVClient.delete(path);
    return true;
  }

  async deleteAllSecrets(path: any): Promise<any> {
    const keys = await (await this.KVClient.list(path)).data.keys;
    for (const key of keys) {
      await this.deleteSecret(path + '/' + key);
    }
    return true;
  }
}
