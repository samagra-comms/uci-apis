import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';

@Module({
  providers: [
    MonitoringService,
  ],
  controllers: [MonitoringController]
})
export class MonitoringModule {}
