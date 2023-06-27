import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../global-services/prisma.service';

@Module({
  providers: [SecretsService, ConfigService, PrismaService],
  controllers: [SecretsController],
})
export class SecretsModule {}
