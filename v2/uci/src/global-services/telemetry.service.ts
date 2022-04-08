import { Injectable, OnModuleInit } from '@nestjs/common';
import PostHog from 'posthog-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelemetryService implements OnModuleInit {
  client: PostHog;
  constructor(private configService: ConfigService) {
    console.log('Constructor Called');
    this.client = new PostHog(this.configService.get('POSTHOG_API_KEY') || '', {
      host: configService.get('POSTHOG_API_HOST'),
      flushAt: configService.get<number>('POSTHOG_BATCH_SIZE'),
      flushInterval: configService.get<number>('POSTHOG_FLUSH_INTERVAL'),
    });
  }

  async onModuleInit() {
    // This should only be printed once - https://docs.nestjs.com/assets/lifecycle-events.png
    console.log('Telemetry: Initialized Successfully 🎉');
  }

  async beforeApplicationShutdown() {
    await this.client.shutdown();
    console.log('Telemetry: Gracefully Shutdown 🎉');
  }
}
