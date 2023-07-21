import { TransformerService } from './transformer.service';
import { TransformerController } from './transformer.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { createMock } from '@golevelup/ts-jest';

describe('TransformerController', () => {
  let controller: TransformerController;

  const mockTransformerData = {
    id: '123',
    createdAt: 1000,
    updatedAt: 1000,
    name: 'mockTransformerService',
    service: { create: 'create' },
    tags: ['tag1', 'tag2'],
    config: {
      value: '123',
    },
  };

  const mockTransformerService = {
    create: jest.fn((data) => {
      return {
        id: '123',
        createdAt: 1000,
        updatedAt: 1000,
        name: data.name,
        service: { create: data.service },
        tags: data.tags,
        config: data.config,
      };
    }),

    findAll: jest.fn(() => {
      return [
        {
          ...mockTransformerData,
        },
      ];
    }),

    findOne: jest.fn((id) => {
      const res = {
        id,
        createdAt: 1000,
        updatedAt: 1000,
        name: 'mockTransformerService',
        service: { create: 'create' },
        tags: ['tag1', 'tag2'],
        config: {
          value: '123',
        },
      };
      return { ...res };
    }),

    update: jest.fn((id, data) => {
      return {
        id,
        createdAt: 1000,
        updatedAt: 1000,
        name: data.name,
        service: { create: data.service },
        tags: data.tags,
        config: data.config,
      };
    }),

    remove: jest.fn((id) => {
      return {
        id,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransformerController],
      providers: [TransformerService],
    })
      .overrideProvider(TransformerService)
      .useValue(mockTransformerService)
      .overrideInterceptor(AddAdminHeaderInterceptor)
      .useValue(createMock<AddAdminHeaderInterceptor>())
      .overrideInterceptor(AddOwnerInfoInterceptor)
      .useValue(createMock<AddOwnerInfoInterceptor>())
      .compile();

    controller = module.get<TransformerController>(TransformerController);
  });

  describe('create', () => {
    it('should create a new transformer object', () => {
      const data = {
        name: 'mockTransformerService',
        service: 'create',
        tags: ['tag1', 'tag2'],
        config: {
          value: '123',
        },
      };
      expect(controller.create(data)).toEqual(mockTransformerData);
      expect(mockTransformerService.create).toBeCalled;
    });
  });

  describe('findAll', () => {
    it('should return the array of transformer objects', () => {
      expect(controller.findAll()).toEqual([{ ...mockTransformerData }]);
      expect(controller.findAll).toBeCalled;
    });
  });

  describe('findOne', () => {
    it('should return the specific transformer object', () => {
      expect(controller.findOne('123')).toEqual({ ...mockTransformerData });
      expect(mockTransformerService.findOne).toBeCalled;
    });
  });

  describe('update', () => {
    it('should return the updated transformer object', () => {
      const mockResponse = { ...mockTransformerData };
      mockResponse.name = 'updatedName';
      expect(
        controller.update('123', {
          name: 'updatedName',
          service: 'create',
          tags: ['tag1', 'tag2'],
          config: {
            value: '123',
          },
        }),
      ).toEqual(mockResponse);
      expect(mockTransformerService.update).toBeCalled;
    });
  });

  describe('remove', () => {
    it('should successfully delete a transformer object', () => {
      const id = '123';
      expect(controller.remove('123')).toEqual({ id });
      expect(mockTransformerService.remove).toBeCalled;
    });
  });
});
