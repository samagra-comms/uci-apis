import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../global-services/prisma.service';
import { AdapterDTO } from './dto';
import { Adapter, Prisma } from 'prisma/generated/prisma-client-js';
import { PrismaError } from 'src/common/prismaError';
import { TelemetryService } from '../../global-services/telemetry.service';
import { prismaErrorHandler } from '../../common/prismaError.handler';

@Injectable()
export class AdaptersService {
  serviceName = 'Adapter';
  methodCalled: string;
  constructor(
    private prisma: PrismaService,
    private telemetry: TelemetryService,
  ) {}
  async create(createData: AdapterDTO): Promise<Adapter | PrismaError> {
    this.methodCalled = 'create';
    return this.prisma.adapter
      .create({
        data: {
          channel: createData.channel,
          provider: createData.provider,
          name: createData.name,
          config: {
            ...createData.config,
          },
        },
      })
      .catch((err: Prisma.PrismaClientKnownRequestError): PrismaError => {
        return prismaErrorHandler(err);
      });
  }

  findAll(): Promise<Adapter[]> {
    return this.prisma.adapter.findMany();
  }

  findOne(id: string): Promise<Adapter | null> {
    return this.prisma.adapter.findUnique({ where: { id } });
  }

  update(id: string, updateAdapterDto: any) {
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
