import { Module } from '@nestjs/common';
import { SunbirdTelemetryController } from './sunbird-telemetry.controller';

@Module({
  controllers: [SunbirdTelemetryController],
})
export class SunbirdTelemetryModule {}
