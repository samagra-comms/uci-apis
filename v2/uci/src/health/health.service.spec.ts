import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { PrismaService } from '../global-services/prisma.service';
import { FormService } from '../modules/form/form.service';
import { HealthCheckError, HealthIndicatorResult, HttpHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from '../global-services/telemetry.service';

class MockHttpHealthIndicatorUp {
  pingCheck(url: string, timeout: number): Promise<HealthIndicatorResult> {
    return Promise.resolve({
      [url]: {
        status: 'up',
      },
    });
  }
}

class MockFormServiceUp {
  login(): Promise<any> {
    return Promise.resolve();
  }
}

class MockPrismaServiceUp {
  $queryRaw(): Promise<any> {
    return Promise.resolve();
  }
}

describe('HealthService UP checks', () => {
  let healthService: HealthService;
  let primsmaService: PrismaService;
  let formService: FormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule
      ],
      providers: [
        HealthService, {
          provide: HttpHealthIndicator,
          useClass: MockHttpHealthIndicatorUp,
        },
        FormService, {
          provide: FormService,
          useClass: MockFormServiceUp,
        },
        PrismaService, {
          provide: PrismaService,
          useClass: MockPrismaServiceUp,
        },
        ConfigService,
        TelemetryService,
      ],
    }).compile();

    healthService = module.get<HealthService>(HealthService);
    primsmaService = module.get<PrismaService>(PrismaService);
    formService = module.get<FormService>(FormService);
  });

  it('uci core health up check', async () => {
    expect(await healthService.checkUciCoreHealth()).toEqual({
      UCI_CORE: {
        status: 'up',
      }
    });
  });

  it('form service health up check', async () => {
    expect(await healthService.checkFormServiceHealth()).toEqual({
      FormService: {
        status: 'up',
      }
    });
  });

  it('prisma service health up check', async () => {
    expect(await healthService.checkDatabaseHealth()).toEqual({
      PrismaService: {
        status: 'up',
      }
    });
  });
});

class MockHttpHealthIndicatorDown {
  pingCheck(url: string, timeout: number): Promise<HealthIndicatorResult> {
    return Promise.resolve({
      [url]: {
        status: 'down',
        message: 'test down message',
      },
    });
  }
}

class MockFormServiceDown {
  login(): Promise<any> {
    return Promise.reject('test down message');
  }
}

class MockPrismaServiceDown {
  $queryRaw(): Promise<any> {
    return Promise.reject('test down message');
  }
}

describe('HealthService DOWN checks', () => {
  let healthService: HealthService;
  let primsmaService: PrismaService;
  let formService: FormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule
      ],
      providers: [
        HealthService, {
          provide: HttpHealthIndicator,
          useClass: MockHttpHealthIndicatorDown,
        },
        FormService, {
          provide: FormService,
          useClass: MockFormServiceDown,
        },
        PrismaService, {
          provide: PrismaService,
          useClass: MockPrismaServiceDown,
        },
        ConfigService,
        TelemetryService,
      ],
    }).compile();

    healthService = module.get<HealthService>(HealthService);
    primsmaService = module.get<PrismaService>(PrismaService);
    formService = module.get<FormService>(FormService);
  });

  it('uci core health down check', async () => {
    expect(await healthService.checkUciCoreHealth()).toEqual({
      UCI_CORE: {
        status: 'down',
        message: 'test down message',
      }
    });
  });

  it('form service health down check', async () => {
    expect(healthService.checkFormServiceHealth()).rejects.toThrow(HealthCheckError);
  });

  it('prisma service health down check', async () => {
    expect(healthService.checkDatabaseHealth()).rejects.toThrow(HealthCheckError);
  });
});
