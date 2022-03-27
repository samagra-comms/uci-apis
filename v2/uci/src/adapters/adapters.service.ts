import { Injectable } from '@nestjs/common';
import { Adapter } from '../generated/nestjs-dto/adapter.entity';
import { CreateAdapterDto } from '../generated/nestjs-dto/create-adapter.dto';
import { UpdateAdapterDto } from '../generated/nestjs-dto/update-adapter.dto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class AdaptersService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateAdapterDto): Promise<Adapter | null> {
    return this.prisma.adapter.create({ data });
  }

  findAll(): Promise<Adapter[]> {
    return this.prisma.adapter.findMany();
  }

  findOne(id: string): Promise<Adapter | null> {
    return this.prisma.adapter.findUnique({ where: { id } });
  }

  update(id: string, updateAdapterDto: UpdateAdapterDto) {
    return this.prisma.adapter.update({
      where: {
        id,
      },
      data: updateAdapterDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} adapter`;
  }
}
