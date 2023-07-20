import { Test, TestingModule } from '@nestjs/testing';
import { UserSegmentController } from './user-segment.controller';
import { UserSegmentService } from './user-segment.service';

describe.skip('UserSegmentController', () => {
  let controller: UserSegmentController;

  const mockUserSegment = {
    id: '123',
    createdAt: 1000,
    updatedAt: 1000,
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
    create: jest.fn((dto) => {
      return {
        id: 123,
        createdAt: 1000,
        updatedAt: 1000,
        ...dto,
      };
    }),

    findAll: jest.fn(() => {
      return [
        {
          ...mockUserSegment,
        },
      ];
    }),

    findOne: jest.fn((id) => {
      const response = { ...mockUserSegment };
      response.id = id;
      return { ...response };
    }),

    update: jest.fn((id, mockUser) => {
      return {
        id,
        createdAt: 1000,
        updatedAt: 1000,
        ...mockUser,
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
      controllers: [UserSegmentController],
      providers: [UserSegmentService],
    })
      .overrideProvider(UserSegmentService)
      .useValue(mockUserSegmentService)
      .compile();

    controller = module.get<UserSegmentController>(UserSegmentController);
  });

  describe('create', () => {
    it('should crate a user object', () => {
      const user: any = {};

      expect(controller.create(user)).toEqual({
        id: expect.any(Number),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
        ...user,
      });
      expect(mockUserSegmentService.create).toBeCalled;
    });
  });

  describe('findAll', () => {
    it('should return the array of mockUser object', () => {
      expect(controller.findAll()).toEqual([
        {
          ...mockUserSegment,
        },
      ]);
      expect(mockUserSegmentService.findAll()).toBeCalled;
    });
  });

  describe('findOne', () => {
    it('should return the object having same id', () => {
      const response = { ...mockUserSegment };
      response.id = '456';

      expect(controller.findOne('456')).toEqual({ ...response });
      expect(mockUserSegmentService.findOne('456')).toBeCalled;
    });
  });

  describe('update', () => {
    it('should returj the updated user object', () => {
      const response = { ...mockUserSegment };
      response.name = 'mock2';

      expect(
        controller.update('123', {
          name: 'mock2',
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
      ).toEqual({ ...response });

      expect(mockUserSegmentService.update).toBeCalled;
    });
  });

  describe('delete', () => {
    it('should return 1 after successful deletion', () => {
      const id = '123';
      expect(controller.remove(id)).toEqual({ id });

      expect(mockUserSegmentService.remove).toBeCalled;
    });
  });
});
