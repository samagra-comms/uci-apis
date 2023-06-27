import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../global-services/prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService],
})
export class MigrationModule {}
