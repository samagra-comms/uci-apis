import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import VaultClient = require('node-vault-client');

@Injectable()
export class VaultClientProvider {
  constructor(
    private configService: ConfigService
  ){}

  getClient(): any {
    const vaultAddress = this.configService.get('VAULT_ADDR');
    const vaultToken = this.configService.get('VAULT_TOKEN');

    if (!vaultAddress || !vaultToken) {
      throw new Error('Vault address and token are missing in the environment variables');
    }

    return new VaultClient({
      api: { url: vaultAddress },
      auth: {
        type: 'token',
        config: { token: vaultToken },
      },
    });
  }
}