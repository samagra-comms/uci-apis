import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    HealthCheckError,
    HealthCheckResult,
    HealthCheckService,
    HealthIndicator,
    HealthIndicatorResult,
    HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../global-services/prisma.service';
import { FormService } from '../modules/form/form.service';

@Injectable()
export class HealthService extends HealthIndicator{
    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly configService: ConfigService,
        private readonly primsmaService: PrismaService,
        private readonly formService: FormService
    ) {
        super();
    }

    async checkHealth(): Promise<HealthCheckResult> {
        return this.health.check([
            () => this.checkUciCoreHealth(),
            () => this.checkDatabaseHealth(),
            () => this.checkFormServiceHealth(),
        ]);
    }

    async checkUciCoreHealth(): Promise<HealthIndicatorResult> {
        return this.http.pingCheck('UCI_CORE', `${this.configService.get('UCI_CORE_BASE_URL')}/service/ping`, {timeout: 3000});
    }

    async checkDatabaseHealth(): Promise<HealthIndicatorResult> {
        try {
            await this.primsmaService.$queryRaw`SELECT 1`;
            return this.getStatus('PrismaService', true);
        } catch (e) {
            throw new HealthCheckError("PrismaService failed to connect!", this.getStatus('PrismaService', false, {message: e.message}));
        }
    }

    async checkFormServiceHealth(): Promise<HealthIndicatorResult> {
        return this.formService.login()
        .then(() => {
            return this.getStatus('FormService', true);
        })
        .catch((e) => {
            throw new HealthCheckError("FormService failed to connect!", this.getStatus('FormService', false, {message: e.message}));
        });
    }
}
