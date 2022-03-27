import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { AdaptersModule } from './adapters/adapters.module';
import { BotModule } from './bot/bot.module';
import { UserSegmentModule } from './user-segment/user-segment.module';
import { ConversationLogicModule } from './conversation-logic/conversation-logic.module';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { MigrationModule } from './migration/migration.module';
import { MigrationService } from './migration/migration.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MigrationService, RequestInterceptor],
})
export class AppModule {}
