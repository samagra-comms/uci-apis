import { Adapter, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    Adapter(userWhereUniqueInput: Prisma.AdapterWhereUniqueInput): Promise<Adapter | null>;
    users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AdapterWhereUniqueInput;
        where?: Prisma.AdapterWhereInput;
        orderBy?: Prisma.AdapterOrderByWithRelationInput;
    }): Promise<Adapter[]>;
    createUser(data: Prisma.AdapterCreateInput): Promise<Adapter>;
    updateUser(params: {
        where: Prisma.AdapterWhereUniqueInput;
        data: Prisma.AdapterUpdateInput;
    }): Promise<Adapter>;
    deleteUser(where: Prisma.AdapterWhereUniqueInput): Promise<Adapter>;
}
