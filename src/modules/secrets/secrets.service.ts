import { Injectable } from '@nestjs/common';
import { VaultClientProvider } from './secrets.service.provider';

@Injectable()
export class SecretsService {
  private readonly vaultClient;

  constructor(private readonly vaultClientProvider: VaultClientProvider) {
    this.vaultClient = this.vaultClientProvider.getClient();
  }

  async getSecret(path: string, key: string) {
    const consolidatedPath = 'kv/'+path;
    const kvPairs = await this.vaultClient.read (consolidatedPath);
    return kvPairs.__data[key];
  }

  async getSecretByPath(path: string): Promise<any> {
    console.log('getSecretByPath method called');
    const kvPairs = await this.vaultClient.read('kv/'+ path)
    return kvPairs.__data;
  }

  async setSecret(path: string, value: { [key: string]: string }) {
    console.log('SetSecret method called');
    return await this.vaultClient.write('kv/'+ path, value);
  }

  async getAllSecrets(path: string): Promise<any> {
    const data: any[] = [];
    try {
      const keys = await (await this.vaultClient.list(path)).data.keys;
      for (const key of keys) {
        const dataAtKey = await this.getSecretByPath(path + '/' + key);
        data.push({ [`${key}`]: dataAtKey });
      }
    } catch (e) {
      console.log(e);
    }

    return data;
  }

  // async deleteSecret(path: string) {
  //   path = "8f7ee860-0163-4229-9d2a-01cef53145ba\test";
  //   await this.vaultClient.write(path, {});
  //   return true;
  // }

  // async deleteAllSecrets(path: any): Promise<any> {
  //   const keys = await (await this.vaultClient.list(path)).data.keys;
  //   for (const key of keys) {
  //     await this.deleteSecret(path + '/' + key);
  //   }
  //   return true;
  // }
}