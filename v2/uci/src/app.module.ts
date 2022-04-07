import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
  ],
  controllers: [AppController, ServiceController],
  providers: [AppService, PrismaService, MigrationService, ServiceService],
})
export class AppModule {}
