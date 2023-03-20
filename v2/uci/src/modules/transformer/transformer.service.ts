import { Injectable } from '@nestjs/common';
import { Transformer, Service } from '../../../prisma/generated/prisma-client-js';
import { PrismaService } from '../../global-services/prisma.service';

@Injectable()
export class TransformerService {
  constructor(private prisma: PrismaService) { }
  create(data: any): Promise<Transformer | null> {
    const createData = {
      service: { create: data.service },
      name: data.name,
      tags: data.tags,
      config: data.config,
    }
    return this.prisma.transformer.create({ data: createData });
  }

  findAll(): Promise<Transformer[]> {
    return this.prisma.transformer.findMany();
  }

  findOne(id: string): Promise<Transformer | null> {
    return this.prisma.transformer.findUnique({ where: { id } });
  }

  update(id: string, updateAdapterDto: any) {
    return this.prisma.transformer.update({
      where: {
        id,
      },
      data: updateAdapterDto,
    });
  }

  remove(id) {
    return `This action removes a #${id} adapter`;
  }
}
