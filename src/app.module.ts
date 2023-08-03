import { Module, Type, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './global-services/prisma.service';
import { AdaptersModule } from './modules/adapter/adapter.module';
import { BotModule } from './modules/bot/bot.module';
import { UserSegmentModule } from './modules/user-segment/user-segment.module';
import { ConversationLogicModule } from './modules/conversation-logic/conversation-logic.module';
import { MigrationModule } from './migration/migration.module';
import { MigrationService } from './migration/migration.service';
import { SecretsModule } from './modules/secrets/secrets.module';
import { CommonServiceModule } from './global-services/commonService.module';
import { SunbirdTelemetryModule } from './sunbird-telemetry/sunbird-telemetry.module';
import { ServiceModule } from './modules/service/service.module';
import { TransformerModule } from './modules/transformer/transformer.module';
import { ServiceService } from './modules/service/service.service';
import { ServiceController } from './modules/service/service.controller';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './modules/form/form.module';
import { GQLResolverService } from './modules/service/gql.resolver';
import { SecretsService } from './modules/secrets/secrets.service';
import { DeviceManagerService } from './modules/user-segment/fusionauth/fusionauth.service';
import { GetRequestResolverService } from './modules/service/http-get.resolver';
import { PostRequestResolverService } from './modules/service/http-post.resolver';
import { HealthModule } from './health/health.module';
import { FusionAuthClientProvider } from './modules/user-segment/fusionauth/fusionauthClientProvider';
import { VaultClientProvider } from './modules/secrets/secrets.service.provider';
import { MonitoringModule } from './monitoring/monitoring.module';

import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AdaptersModule,
    BotModule,
    MigrationModule,
    UserSegmentModule,
    ConversationLogicModule,
    SecretsModule,
    CommonServiceModule,
    SunbirdTelemetryModule,
    ServiceModule,
    TransformerModule,
    AuthModule,
    FormModule,
    HealthModule,
    CacheModule.register(
      {
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 1800, //seconds
    }
    ),
    MonitoringModule,
  ],
  controllers: [AppController, ServiceController],
  providers: [
    AppService,
    PrismaService,
    MigrationService,
    ServiceService,
    GQLResolverService,
    GetRequestResolverService,
    PostRequestResolverService,
    SecretsService,
    FusionAuthClientProvider,
    DeviceManagerService,
    VaultClientProvider,
  ],
})
export class AppModule {}
