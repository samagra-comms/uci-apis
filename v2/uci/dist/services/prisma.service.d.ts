import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/prisma-client-js';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
