import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Bot,
  BotStatus,
  Prisma,
} from '../../../prisma/generated/prisma-client-js';
import { PrismaService } from '../../global-services/prisma.service';
import fetch from 'isomorphic-fetch';
import { ConfigService } from '@nestjs/config';
import { caseInsensitiveQueryBuilder } from '../../common/prismaUtils';
import { CreateBotDto } from './dto/create-bot.dto';

@Injectable()
export class BotService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  private include = {
    users: {
      include: {
        all: true,
      },
    },
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
        // await this.prisma.bot
        //   .update({
        //     where: {
        //       id,
        //     },
        //     data: {
        //       status: BotStatus.DISABLED,
        //     },
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //     return false;
        //   });
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }

  // TODO: restrict type of config
  async start(id: string, config: any) {
    const totalRecords: number = config.totalRecords;
    const pageSize: number = config.cadence.perPage;
    let pages = Math.ceil(totalRecords/pageSize);
    const promises: any = [];
    for (let page = 1; page <= pages; page++) {
      console.log(
        `${this.configService.get(
          'UCI_CORE_BASE_URL',
        )}/campaign/start?campaignId=${id}&page=${page}`,
      );
      const promise = fetch(`${this.configService.get('UCI_CORE_BASE_URL',)}/campaign/start?campaignId=${id}&page=${page}`)
      promises.push(promise);
    }
    return await Promise.all(promises)
    .then(res => true)
    .catch(err => {
      console.log(err);
      return false;
    });
  }

  // dateString = '2020-01-01'
  private getDateFromString(dateString: string) {
    return new Date(dateString);
  }

  async create(
    data: CreateBotDto & { ownerID: string; ownerOrgID: string },
  ): Promise<Bot | null> {
    console.log({ data });
    // Check for unique name
    const name = data.name;
    const isUniqueName = await this.prisma.bot.findUnique({
      where: {
        name,
      },
    });
    console.log({ isUniqueName, data });
    if (!isUniqueName) {
      console.log(
        'Creating bot',
        data.status === 'enabled' ? BotStatus.ENABLED : BotStatus.DISABLED,
      );
      const createData = {
        startingMessage: data.startingMessage,
        name: data.name,
        ownerID: data.ownerid,
        ownerOrgID: data.ownerorgid,
        status:
          data.status === 'enabled' ? BotStatus.ENABLED : BotStatus.DISABLED,
        startDate: this.getDateFromString(data.startDate),
        endDate: this.getDateFromString(data.endDate),
        tags: data.tags,
        logicIDs: {
          connect: data.logic.map((logic) => {
            return {
              id: logic,
            };
          }),
        },
        users: {
          connect: data.users.map((user) => {
            return {
              id: user,
            };
          }),
        },
      };
      return this.prisma.bot.create({ data: createData });
    } else {
      throw new HttpException(
        'Bot already exists with the following name',
        HttpStatus.CONFLICT,
      );
    }
  }

  findAll(): Promise<Bot[]> {
    return this.prisma.bot.findMany();
  }

  findAllContextual(ownerID, ownerOrgID): Promise<Bot[]> {
    return this.prisma.bot.findMany({
      where: {
        ownerID: ownerID,
        ownerOrgID: ownerOrgID,
      },
      include: this.include,
    });
  }

  findByQuery(query: any) {
    return this.prisma.bot.findMany({
      where: {
        OR: query,
      },
      include: this.include,
    });
  }

  findOne(id: string): Promise<Prisma.BotGetPayload<{
    include: {
      users: {
        include: {
          all: true;
        };
      };
      logicIDs: {
        include: {
          transformers: true;
          adapter: true;
        };
      };
    };
  }> | null> {
    return this.prisma.bot.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async find(
    perPage: number,
    page: number,
    name: string,
    startingMessage: string,
    match: boolean,
    ownerID: string,
    ownerOrgID: string,
  ): Promise<{ data: Bot[]; totalCount: number } | null> {
    let filterQuery: any = {
      ownerID: ownerID,
      ownerOrgID: ownerOrgID,
    };
    if (name || startingMessage) {
      filterQuery.OR = [
        {
          name: match ? name : caseInsensitiveQueryBuilder(name),
        },
        {
          startingMessage: match
            ? startingMessage
            : caseInsensitiveQueryBuilder(startingMessage),
        },
      ];
    }
    if (!ownerID || !ownerOrgID) {
      delete filterQuery.ownerID;
      delete filterQuery.ownerOrgID;
      filterQuery.OR = [
        {
          name: match ? name : caseInsensitiveQueryBuilder(name),
        },
        {
          startingMessage: match
            ? startingMessage
            : caseInsensitiveQueryBuilder(startingMessage),
        },
      ];
    }
    const count = await this.prisma.bot.count({ where: filterQuery });
    const data = await this.prisma.bot.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: filterQuery,
      include: this.include,
    });
    return { data: data, totalCount: count };
  }

  async findForAdmin(
    perPage: number,
    page: number,
    name: string,
    startingMessage: string,
    match: boolean,
    ownerID: string,
    ownerOrgID: string,
  ): Promise<Bot[] | null> {
    let filterQuery: any = {
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
    };
    return this.prisma.bot.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: filterQuery,
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

// http://10.139.255.159:9080/campaign/start?campaignId=b9b4ff0d-e37d-4f51-aec2-8b8695f66ef9
// http://10.139.255.159:9080/start?campaignId=74a937cd-09f6-40cb-8021-b5c69f0f6239
