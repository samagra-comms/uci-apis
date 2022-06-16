import { Injectable } from '@nestjs/common';
import { Bot, BotStatus } from '../../../prisma/generated/prisma-client-js';
import { PrismaService } from '../../global-services/prisma.service';
import fetch from 'isomorphic-fetch';
import { ConfigService } from '@nestjs/config';
import { caseInsensitiveQueryBuilder } from '../../common/prismaUtils';

@Injectable()
export class BotService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  private include = {
    users: true,
    logicIDs: {
      include: {
        transformers: true,
        adapter: true,
      },
    },
  };

  pause(id: string) {
    console.log(this.configService.get('UCI_CORE_BASE_URL'));
    return fetch(
      `${this.configService.get('UCI_CORE_BASE_URL')}/pause?campaignId=${id}`,
    )
      .then(async (s) => {
        await this.prisma.bot
          .update({
            where: {
              id,
            },
            data: {
              status: BotStatus.DISABLED,
            },
          })
          .catch((e) => {
            console.error(e);
            return false;
          });
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }

  start(id: string) {
    console.log(this.configService.get('UCI_CORE_BASE_URL'));
    return fetch(
      `${this.configService.get('UCI_CORE_BASE_URL')}/start?campaignId=${id}`,
    )
      .then(async (s) => {
        await this.prisma.bot
          .update({
            where: {
              id,
            },
            data: {
              status: BotStatus.DISABLED,
            },
          })
          .catch((e) => {
            console.error(e);
            return false;
          });
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }

  create(data: any): Promise<Bot | null> {
    return this.prisma.bot.create({ data });
  }

  findAll(): Promise<Bot[]> {
    return this.prisma.bot.findMany();
  }

  findByQuery(query: any) {
    return this.prisma.bot.findMany({
      where: {
        OR: query,
      },
      include: this.include,
    });
  }

  findOne(id: string): Promise<Bot | null> {
    return this.prisma.bot.findUnique({
      where: { id },
      include: this.include,
    });
  }

  find(
    perPage: number,
    page: number,
    name: string,
    startingMessage: string,
    match: boolean,
    ownerID: string,
    ownerOrgID: string,
  ): Promise<Bot[] | null> {
    return this.prisma.bot.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: {
        ownerID: ownerID,
        ownerOrgID: ownerOrgID,
        OR: [
          {
            name: match ? name : caseInsensitiveQueryBuilder(name),
          },
          {
            startingMessage: match
              ? startingMessage
              : caseInsensitiveQueryBuilder(startingMessage),
          },
        ],
      },
      include: this.include,
    });
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
