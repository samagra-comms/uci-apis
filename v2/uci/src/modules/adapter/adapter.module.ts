import { Module } from '@nestjs/common';
import { AdaptersService } from './adapter.service';
import { AdaptersController } from './adapter.controller';
import { PrismaService } from '../../global-services/prisma.service';
import { CommonServiceModule } from '../../global-services/commonService.module';

@Module({
  controllers: [AdaptersController],
  imports: [CommonServiceModule],
  providers: [AdaptersService, PrismaService],
})
export class AdaptersModule {}
