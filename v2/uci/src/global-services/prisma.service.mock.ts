import { PrismaClient } from 'prisma/generated/prisma-client-js';
import { Context, createMockContext } from './prisma.context';
const mockCtx = createMockContext();
const ctx = mockCtx as unknown as Context;

const PrismaServiceMock: PrismaClient =
  mockCtx.prisma as unknown as PrismaClient;

export { PrismaServiceMock };
