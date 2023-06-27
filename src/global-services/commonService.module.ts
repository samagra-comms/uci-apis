import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

//Singleton pattern - https://stackoverflow.com/questions/60192912/how-to-create-a-service-that-acts-as-a-singleton-with-nestjs
@Module({
  providers: [TelemetryService],
  exports: [TelemetryService],
})
export class CommonServiceModule {
  constructor(private telemetryService: TelemetryService) {}
}
