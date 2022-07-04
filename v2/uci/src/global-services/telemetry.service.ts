import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import PostHog from 'posthog-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelemetryService implements OnModuleInit {
  private readonly logger = new Logger('TelemetryService');
  client: PostHog;
  constructor(private configService: ConfigService) {
    this.client = new PostHog(this.configService.get('POSTHOG_API_KEY') || '', {
      host: configService.get('POSTHOG_API_HOST'),
      flushAt: configService.get<number>('POSTHOG_BATCH_SIZE'),
      flushInterval: configService.get<number>('POSTHOG_FLUSH_INTERVAL'),
    });
  }

  async onModuleInit() {
    // This should only be printed once - https://docs.nestjs.com/assets/lifecycle-events.png
    this.logger.verbose('Initialized Successfully 🎉');
    this.client.identify({
      distinctId: 'NestJS-Local',
      properties: {
        version: this.configService.get('NEST_VERSION'),
      },
    });
  }

  async beforeApplicationShutdown() {
    await this.client.shutdown();
    this.logger.verbose('Gracefully Shutdown 🎉');
  }
}
