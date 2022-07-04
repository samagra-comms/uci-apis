import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TelemetryService } from '../../global-services/telemetry.service';
import { PrismaService } from '../../global-services/prisma.service';

@Module({
  controllers: [FormController],
  providers: [FormService, TelemetryService, PrismaService],
})
export class FormModule {}
