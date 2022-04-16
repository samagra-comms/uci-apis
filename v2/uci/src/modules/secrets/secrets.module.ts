import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';
import { PrismaService } from 'src/global-services/prisma.service';

@Module({
  providers: [SecretsService, PrismaService],
  controllers: [SecretsController],
})
export class SecretsModule {}
