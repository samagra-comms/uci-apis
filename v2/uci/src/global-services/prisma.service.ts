import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '../../prisma/generated/prisma-client-js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('DB: Up 🎉');
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
      console.log('DB: Graceful Shutdown 🎉');
    });
  }
}
