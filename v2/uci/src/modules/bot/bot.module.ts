import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { PrismaService } from '../../global-services/prisma.service';
import { ServiceService } from '../service/service.service';
import { GQLResolverService } from '../service/gql.resolver';
import { TelemetryService } from '../../global-services/telemetry.service';
import { ConfigService } from '@nestjs/config';
import { SecretsService } from '../secrets/secrets.service';
import { DeviceManagerService } from '../user-segment/fusionauth/fusionauth.service';
import { GetRequestResolverService } from '../service/http-get.resolver';
import { PostRequestResolverService } from '../service/http-post.resolver';

@Module({
  controllers: [BotController],
  providers: [
    BotService,
    PrismaService,
    ServiceService,
    GQLResolverService,
    GetRequestResolverService,
    PostRequestResolverService,
    ConfigService,
    TelemetryService,
    SecretsService,
    DeviceManagerService,
  ],
})
export class BotModule {}
