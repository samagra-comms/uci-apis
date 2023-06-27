import { Injectable, Logger } from '@nestjs/common';
import { UserSegment, Service, Prisma } from '../../../prisma/generated/prisma-client-js';
import { PrismaService } from '../../global-services/prisma.service';

@Injectable()
export class UserSegmentService {
  logger: Logger;
  constructor(private prisma: PrismaService) {
    this.logger = new Logger('UserSegmentService');
  }

  async fetchOrCreateExistingService(type: string, config: any, loggerTag?: string): Promise<Service | null> {
    // TODO: Check if the service is valid or not.
    let service = await this.prisma.service.findFirst({
      where: {
        type: type,
        config: {
          equals: config
        }
      }
    })
    if (service) {
      this.logger.log(`${loggerTag} service already created:: ${service.id}`)
    } else {
      service = await this.prisma.service.create({
        data: {
          type: type,
          config: config,
        }
      })
    }
    return service;
  }

  async create(data: any): Promise<UserSegment | null> {
    console.log(data.byPhone?.type);
    const allService = data.all?.type !== null && data.all?.type !== undefined ? await this.fetchOrCreateExistingService(data.all.type, data.all.config, "AllService") : null;
    const byPhoneService = data.byPhone?.type !== null && data.byPhone?.type !== undefined ? await this.fetchOrCreateExistingService(data.byPhone.type, data.byPhone.config, "ByPhoneService") : null;
    const byIDService = data.byId?.type !== null && data.byId?.type !== undefined ? await this.fetchOrCreateExistingService(data.byId.type, data.byId.config, "ByIdService") : null;

    let createData: Prisma.UserSegmentCreateInput = {
      name: data.name,
      all: allService === null ? undefined : {
        connect: {
          id: allService.id
        }
      },
      byPhone: byPhoneService === null ? undefined : {
        connect: {
          id: byPhoneService.id
        }
      },
      byID: byIDService === null ? undefined : {
        connect: {
          id: byIDService.id
        }
      }
    }
    return this.prisma.userSegment.create({ data: createData });
  }

  findAll(): Promise<UserSegment[]> {
    return this.prisma.userSegment.findMany();
  }

  findOne(id: string): Promise<UserSegment | null> {
    return this.prisma.userSegment.findUnique({ where: { id } });
  }

  update(id: string, updateAdapterDto: any) {
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
