import { Injectable } from '@nestjs/common';
import {
  ConversationLogic,
  Prisma,
} from '../../../prisma/generated/prisma-client-js';
import { PrismaService } from '../../global-services/prisma.service';

@Injectable()
export class ConversationLogicService {
  private include = {
    transformers: {
      include: {
        all: true,
      },
    },
  };
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<ConversationLogic | null> {
    // Loop over TransformerConfig to figure out if we need to create anyone
    const tansformerConfigs: any[] = [];
    for (let i = 0; i < data.transformers.length; i++) {
      try {
        const created = await this.prisma.transformerConfig.create({
          data: {
            meta: data.transformers[i].meta || {},
            transformer: {
              connect: {
                id: data.transformers[i].id,
              },
            },
          },
        });
        tansformerConfigs.push(created.id);
      } catch (e) {
        const tc = await this.prisma.transformerConfig.findFirst({
          where: {
            meta: { equals: data.transformers[i].meta },
            transformerId: data.transformers[i].id,
          },
        });
        console.log('Already exists', tc);
        if (tc) {
          tansformerConfigs.push(tc.id);
        }
      }
    }
    console.info({ tansformerConfigs });
    const createData = {
      name: data.name,
      adapter: {
        connect: {
          id: data.adapter,
        },
      },
      transformers: {
        connect: tansformerConfigs.map((id) => ({ id })),
      },
    };
    return this.prisma.conversationLogic.create({
      data: createData,
    });
  }

  findAll(): Promise<ConversationLogic[]> {
    return this.prisma.conversationLogic.findMany({
      include: {
        adapter: true,
        transformers: true,
      },
    });
  }

  findOne(id: string): Promise<Prisma.ConversationLogicGetPayload<{
    include: {
      adapter: true;
      transformers: true;
    };
  }> | null> {
    return this.prisma.conversationLogic.findUnique({
      where: { id },
      include: {
        adapter: true,
        transformers: true,
      },
    });
  }

  update(id: string, updateAdapterDto: any) {
    return this.prisma.conversationLogic.update({
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
