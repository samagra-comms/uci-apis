import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from '../../global-services/telemetry.service';
import { SecretsService } from '../secrets/secrets.service';
import { GQLResolverService } from './gql.resolver';
import { GetRequestResolverService } from './http-get.resolver';
import { PostRequestResolverService } from './http-post.resolver';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  controllers: [ServiceController],
  providers: [
    ServiceService,
    GQLResolverService,
    ConfigService,
    TelemetryService,
    SecretsService,
    GetRequestResolverService,
    PostRequestResolverService,
  ],
})
export class ServiceModule {}
