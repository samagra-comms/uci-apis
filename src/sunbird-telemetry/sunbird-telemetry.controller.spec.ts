import { Test, TestingModule } from '@nestjs/testing';
import { SunbirdTelemetryController } from './sunbird-telemetry.controller';

describe('SunbirdTelemetryController', () => {
  let controller: SunbirdTelemetryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SunbirdTelemetryController],
    }).compile();

    controller = module.get<SunbirdTelemetryController>(
      SunbirdTelemetryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
