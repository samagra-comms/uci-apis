import { Injectable } from '@nestjs/common';
import { VaultClientProvider } from './secrets.service.provider';

@Injectable()
export class SecretsService {
  private readonly vaultClient;

  constructor(private readonly vaultClientProvider: VaultClientProvider) {
    this.vaultClient = this.vaultClientProvider.getClient();
  }

  async getSecret(path: string, key: string) {
    const fullpath = 'kv/'+path;
    const kvPairs = await this.vaultClient.read (fullpath);
    return kvPairs.__data[key];
  }

  async getSecretByPath(path: string): Promise<any> {
    console.log('getSecretByPath method called');
    const fullpath = 'kv/'+path;
    const kvPairs = await this.vaultClient.read(fullpath)
    return kvPairs.__data;
  }

  async setSecret(path: string, value: { [key: string]: string }) {
    console.log('SetSecret method called');
    const fullpath = 'kv/'+path;
    return await this.vaultClient.write(fullpath, value);
  }

  async getAllSecrets(path: string): Promise<any> {
    const data: any[] = [];
    try {
      const fullpath = 'kv/' + path;
      const keys = await (await this.vaultClient.list(fullpath)).__data.keys;
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
    await this.vaultClient.write('kv/'+ path, {"":""});
    return true;
  }

  async deleteAllSecrets(path: any): Promise<any> {
    const fullpath = 'kv/' + path;
    const keys = await (await this.vaultClient.list(fullpath)).__data.keys;
    for (const key of keys) {
      await this.deleteSecret(path + '/' + key);
    }
    return true;
  }
}