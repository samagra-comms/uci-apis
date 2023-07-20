import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthCheckResult } from '@nestjs/terminus';

describe.skip('HealthController', () => {
  let controller: HealthController;

  const mockHealthService = {
    checkHealth: jest.fn().mockResolvedValue({
      status: 'ok',
      details: {
        'UCI-API': {
          status: 'up',
        },
      },
    } as HealthCheckResult),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    })
      .overrideProvider(HealthService)
      .useValue(mockHealthService)
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  describe('getServiceHealth', () => {
    it('should return service health check result', async () => {
      const mockResult: HealthCheckResult = {
        status: 'ok',
        details: {
          'UCI-API': {
            status: 'up',
          },
        },
      };

      const result = await controller.getServiceHealth();
      expect(result).toEqual(mockResult);
    });
  });

  describe('checkHealth', () => {
    it('should return health check result', async () => {
      const mockBody: any = {};
      const mockResponse = {
        status: 'ok',
        details: {
          'UCI-API': {
            status: 'up',
          },
        },
      };
      const result = await controller.checkHealth(mockBody);

      expect(result).toEqual(mockResponse);
      expect(mockHealthService.checkHealth).toBeCalled;
    });
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
