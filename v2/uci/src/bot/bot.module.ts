import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [BotController],
  providers: [BotService, PrismaService],
})
export class BotModule {}
