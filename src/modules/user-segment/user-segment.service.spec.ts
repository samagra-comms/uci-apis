import { Test, TestingModule } from '@nestjs/testing';
import { UserSegmentService } from './user-segment.service';
import { PrismaService } from '../../global-services/prisma.service';

describe('UserSegmentService', () => {
  let service: UserSegmentService;

  const mockUserSegment = {
    id: '123',
    createdAt: 10000,
    updatedAt: 10000,
    name: 'mockUserSegment',
    all: {
      connect: {
        id: 7,
      },
    },
    byPhone: {
      connect: {
        id: 8,
      },
    },
    byId: {
      connect: {
        id: 9,
      },
    },
  };

  const mockUserSegmentService = {
    userSegment: {
      create: jest.fn(async (userSegment) => {
        return {
          id: '123',
          createdAt: 10000,
          updatedAt: 10000,
          name: userSegment.data.name,
          all: {
            connect: {
              id: 7,
            },
          },
          byPhone: {
            connect: {
              id: 8,
            },
          },
          byId: {
            connect: {
              id: 9,
            },
          },
        };
      }),

      findUnique: jest.fn((filter) => {
        const resp = { ...mockUserSegment };
        resp.id = filter.where.id;
        return resp;
      }),

      findMany: jest.fn().mockReturnValue([{ ...mockUserSegment }]),
    },
    adapter: {
      update: jest.fn((payload) => {
        return {
          id: payload.where.id,
          createdAt: 10000,
          updatedAt: 10000,
          ...payload.data,
        };
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSegmentService,
        {
          provide: PrismaService,
          useValue: mockUserSegmentService,
        },
      ],
    }).compile();

    service = module.get<UserSegmentService>(UserSegmentService);
  });

  describe('create', () => {
    it('should successfully create a user segment', async () => {
      const userSegment = {
        name: 'mockUserSegment',
        all: 7,
        phone: 8,
        ID: 9,
      };
      expect(await service.create(userSegment)).toEqual({ ...mockUserSegment });
      expect(mockUserSegmentService.userSegment.create).toHaveBeenCalled;
    });
  });

  describe('findOne', () => {
    it('should return specific user info', () => {
      const resp = { ...mockUserSegment };
      resp.id = '567';
      expect(service.findOne('567')).toEqual({ ...resp });
      expect(mockUserSegmentService.userSegment.findUnique).toHaveBeenCalled;
    });
  });

  describe('findAll', () => {
    it('should return array of all user segment object', () => {
      expect(service.findAll()).toEqual([{ ...mockUserSegment }]);
      expect(mockUserSegmentService.userSegment.findMany).toHaveBeenCalled;
    });
  });

  describe('update', () => {
    it('should successfully update user segment', () => {
      const resp = { ...mockUserSegment };
      resp.name = 'updatedName';
      expect(
        service.update('123', {
          name: 'updatedName',
          all: {
            connect: {
              id: 7,
            },
          },
          byPhone: {
            connect: {
              id: 8,
            },
          },
          byId: {
            connect: {
              id: 9,
            },
          },
        }),
      ).toEqual({ ...resp });
      expect(mockUserSegmentService.adapter.update).toHaveBeenCalled;
    });
  });

  describe('remove', () => {
    it('should remove user segment object', () => {
      const id = '123';
      expect(service.remove('123')).toEqual(
        `This action removes a #${id} adapter`,
      );
    });
  });
});
