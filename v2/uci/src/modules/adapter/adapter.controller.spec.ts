import { Test, TestingModule } from '@nestjs/testing';
import { AdaptersController } from './adapter.controller';
import { AdaptersService } from './adapter.service';
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { createMock } from '@golevelup/ts-jest';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';
import { PrismaService } from '../../global-services/prisma.service';

describe('AdaptersController', () => {
  let controller: AdaptersController;
  let service: AdaptersService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdaptersController],
      providers: [
        {
          provide: AdaptersService,
          useValue: {
            create: jest.fn((adapterDTO) => {
              return {
                id: 'mockID',
                createdAt: 1000000000000,
                updatedAt: 1000000000000,
                ...adapterDTO,
              };
            }),
            findAll: jest.fn().mockReturnValue([
              {
                ...mockAdapter,
              },
            ]),
            findOne: jest.fn((id) => {
              const res = { ...mockAdapter };
              res.id = id;
              return res;
            }),
            update: jest.fn((ID, adapterDTO) => {
              return {
                id: ID,
                createdAt: 1000000000000,
                updatedAt: 1000000000000,
                ...adapterDTO,
              };
            }),
          },
        },
        PrismaService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(createMock<PrismaService>())
      .overrideInterceptor(AddAdminHeaderInterceptor)
      .useValue(createMock<AddAdminHeaderInterceptor>())
      .overrideInterceptor(AddOwnerInfoInterceptor)
      .useValue(createMock<AddOwnerInfoInterceptor>())
      .compile();

    controller = module.get<AdaptersController>(AdaptersController);
    service = module.get<AdaptersService>(AdaptersService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('root', () => {
    it('Create() | Should return "Adapter" object', () => {
      expect(
        controller.create({
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

      expect(service.create).toHaveBeenCalled();
    });

    it('findAll() | Should return array of "Adapter" objects', () => {
      expect(controller.findAll()).toEqual([
        {
          ...mockAdapter,
        },
      ]);

      expect(service.findAll).toHaveBeenCalled();
    });

    it('findOne() | Should return "Adapter" object', () => {
      const res = { ...mockAdapter };
      res.id = 'mockID2';
      expect(controller.findOne('mockID2')).toEqual({ ...res });

      expect(service.findOne).toHaveBeenCalled();
    });

    it('update() | Should return "Adapter" object', () => {
      const res = { ...mockAdapter };
      res.name = 'mockName2';
      expect(
        controller.update('mockID', {
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

      expect(service.update).toHaveBeenCalled();
    });
  });
});
