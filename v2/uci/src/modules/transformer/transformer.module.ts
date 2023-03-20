import { Module } from '@nestjs/common';
import { TransformerService } from './transformer.service';
import { TransformerController } from './transformer.controller';
import { PrismaService } from '../../global-services/prisma.service';

@Module({
  controllers: [TransformerController],
  providers: [TransformerService, PrismaService],
})
export class TransformerModule { }
