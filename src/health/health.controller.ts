import { Body, Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheckResult } from '@nestjs/terminus';
import { Public } from '../auth/public.decorator';

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthService
    ) {}

    @Public() 
    @Get()
    async checkHealth(@Body() body: any): Promise<HealthCheckResult> {
        return this.healthService.checkHealth();
    }

    @Public() 
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
