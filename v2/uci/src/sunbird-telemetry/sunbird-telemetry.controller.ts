import { OnModuleInit } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';

interface IncomingMessage {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: any;
  headers: Record<string, any>;
}

@Controller('sunbird-telemetry')
export class SunbirdTelemetryController {
  @MessagePattern('telemetry')
  async handleEntityCreated(payload: IncomingMessage) {
    console.log('Received event: ', payload);
    console.log(JSON.parse(payload.value));
  }
}
