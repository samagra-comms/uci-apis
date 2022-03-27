import { Module } from '@nestjs/common';
import { UserSegmentService } from './user-segment.service';
import { UserSegmentController } from './user-segment.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [UserSegmentController],
  providers: [UserSegmentService, PrismaService],
})
export class UserSegmentModule {}
