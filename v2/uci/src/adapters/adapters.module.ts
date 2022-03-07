import { Module } from '@nestjs/common';
import { AdaptersService } from './adapters.service';
import { AdaptersController } from './adapters.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [AdaptersController],
  providers: [AdaptersService, PrismaService]
})
export class AdaptersModule {}
