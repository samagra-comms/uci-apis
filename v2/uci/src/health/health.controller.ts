import { Body, Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheckResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthService
    ) {}

    @Get()
    async checkHealth(@Body() body: any): Promise<HealthCheckResult> {
        return this.healthService.checkHealth();
    }

    @Get('/ping')
    async getServiceHealth(): Promise<HealthCheckResult> {
        const resp: HealthCheckResult = {
            status: 'ok',
            details: {
                "UCI-API": {
                    "status": "up"
                }
            },
        };
        return resp;
    }
}
