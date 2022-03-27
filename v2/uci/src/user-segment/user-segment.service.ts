import { Injectable } from '@nestjs/common';
import { UserSegment } from '../../prisma/generated/prisma-client-js';
import { CreateUserSegmentDto } from '../generated/nestjs-dto/create-userSegment.dto';
import { UpdateUserSegmentDto } from '../generated/nestjs-dto/update-userSegment.dto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserSegmentService {
  constructor(private prisma: PrismaService) {}
  create(data: any): Promise<UserSegment | null> {
    return this.prisma.userSegment.create({ data });
  }

  findAll(): Promise<UserSegment[]> {
    return this.prisma.userSegment.findMany();
  }

  findOne(id: string): Promise<UserSegment | null> {
    return this.prisma.userSegment.findUnique({ where: { id } });
  }

  update(id: string, updateAdapterDto: UpdateUserSegmentDto) {
    return this.prisma.adapter.update({
      where: {
        id,
      },
      data: updateAdapterDto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} adapter`;
  }
}
