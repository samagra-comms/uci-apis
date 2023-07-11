import { Injectable } from '@nestjs/common';
import VaultClient = require('node-vault-client');

@Injectable()
export class VaultClientProvider {
  getClient(): any {
    const vaultAddress = process.env.VAULT_ADDR;
    const vaultToken = process.env.VAULT_TOKEN;

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