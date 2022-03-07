import { Module } from '@nestjs/common';
import { ConversationLogicService } from './conversation-logic.service';
import { ConversationLogicController } from './conversation-logic.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [ConversationLogicController],
  providers: [ConversationLogicService, PrismaService]
})
export class ConversationLogicModule {}
