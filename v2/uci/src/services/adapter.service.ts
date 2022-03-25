import { Adapter, Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async Adapter(
    userWhereUniqueInput: Prisma.AdapterWhereUniqueInput,
  ): Promise<Adapter | null> {
    return this.prisma.adapter.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AdapterWhereUniqueInput;
    where?: Prisma.AdapterWhereInput;
    orderBy?: Prisma.AdapterOrderByWithRelationInput;
  }): Promise<Adapter[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.adapter.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.AdapterCreateInput): Promise<Adapter> {
    return this.prisma.adapter.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.AdapterWhereUniqueInput;
    data: Prisma.AdapterUpdateInput;
  }): Promise<Adapter> {
    const { where, data } = params;
    return this.prisma.adapter.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.AdapterWhereUniqueInput): Promise<Adapter> {
    return this.prisma.adapter.delete({
      where,
    });
  }
}
