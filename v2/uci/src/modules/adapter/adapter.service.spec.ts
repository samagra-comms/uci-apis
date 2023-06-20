import { Test, TestingModule } from '@nestjs/testing';
import { AdaptersService } from './adapter.service';
import { PrismaService } from '../../global-services/prisma.service';
import { createMock } from '@golevelup/ts-jest';
import { TelemetryService } from '../../global-services/telemetry.service';

describe('AdaptersService', () => {
  let service: AdaptersService;
  let mockPrismaService: PrismaService;

  const mockAdapter = {
    id: 'mockID',
    createdAt: 1000000000000,
    updatedAt: 1000000000000,
    channel: 'mockChannel',
    provider: 'mockProvider',
    config: {
      phone: '0000000000',
      HSM_ID: 'mockHSMID',
      '2WAY': 'mock2WAY',
      credentials: { ['mockKey']: 'mockKeys' },
    },
    name: 'mockName',
  };

  const mockPrismaServiceValue = {
    adapter: {
      create: jest.fn(async (adapterDTO) => {
        return {
          id: 'mockID',
          createdAt: 1000000000000,
          updatedAt: 1000000000000,
          channel: adapterDTO.data.channel,
          provider: adapterDTO.data.provider,
          config: adapterDTO.data.config,
          name: adapterDTO.data.name,
        };
      }),
      findMany: jest.fn().mockReturnValue([
        {
          ...mockAdapter,
        },
      ]),
      findUnique: jest.fn((filter) => {
        const res = { ...mockAdapter };
        res.id = filter.where.id;
        return res;
      }),
      update: jest.fn((payload) => {
        return {
          id: payload.where.id,
          createdAt: 1000000000000,
          updatedAt: 1000000000000,
          ...payload.data,
        };
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: { ...mockPrismaServiceValue },
        },
        AdaptersService,
        TelemetryService,
      ],
    })
      .overrideProvider(TelemetryService)
      .useValue(createMock<TelemetryService>())
      .compile();

    service = module.get<AdaptersService>(AdaptersService);
    mockPrismaService = module.get<PrismaService>(PrismaService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('root', () => {
    it('Create() | Should return "Adapter" object', async () => {
      expect(
        await service.create({
          channel: 'mockChannel',
          provider: 'mockProvider',
          name: 'mockName',
          config: {
            phone: '0000000000',
            HSM_ID: 'mockHSMID',
            '2WAY': 'mock2WAY',
            credentials: { ['mockKey']: 'mockKeys' },
          },
        }),
      ).toEqual({
        ...mockAdapter,
      });

      expect(mockPrismaService.adapter.create).toHaveBeenCalled();
    });

    it('findAll() | Should return array of "Adapter" objects', () => {
      expect(service.findAll()).toEqual([
        {
          ...mockAdapter,
        },
      ]);

      expect(mockPrismaService.adapter.findMany).toHaveBeenCalled();
    });

    it('findOne() | Should return "Adapter" object', () => {
      const res = { ...mockAdapter };
      res.id = 'mockID2';
      expect(service.findOne('mockID2')).toEqual({ ...res });

      expect(mockPrismaService.adapter.findUnique).toHaveBeenCalled();
    });

    it('update() | Should return "Adapter" object', () => {
      const res = { ...mockAdapter };
      res.name = 'mockName2';
      expect(
        service.update('mockID', {
          channel: 'mockChannel',
          provider: 'mockProvider',
          name: 'mockName2',
          config: {
            phone: '0000000000',
            HSM_ID: 'mockHSMID',
            '2WAY': 'mock2WAY',
            credentials: { ['mockKey']: 'mockKeys' },
          },
        }),
      ).toEqual({
        ...res,
      });

      expect(mockPrismaService.adapter.update).toHaveBeenCalled();
    });
  });
});
