import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import fetch from 'node-fetch';

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

@Controller()
export class SunbirdTelemetryController {
  @MessagePattern('telemetry')
  async handleEntityCreated(payload: IncomingMessage) {
    console.log(JSON.parse(payload.value));
    const eventPayload = JSON.parse(payload.value);
    const event = {
      id: 'ekstep.telemetry',
      ver: '3.0',
      ets: Math.floor(Date.now() / 1000),
      events: [] as any[],
    };
    event.events.push(eventPayload);
    // TODO: migrate this to undici
    const telemetryResponse = await fetch(
      process.env.TELEMETRY_BASE_URL + '/v1/telemetry',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      },
    );
    console.log({ telemetryResponse });
  }
}
