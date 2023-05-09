import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaService } from '../global-services/prisma.service';
import { FormService } from '../modules/form/form.service';
import { TelemetryService } from '../global-services/telemetry.service';

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthController],
    providers: [
        HealthService,
        PrismaService,
        FormService,
        TelemetryService
    ],
})
export class HealthModule {}
