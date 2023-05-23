import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Bot,
  BotStatus,
  Prisma,
} from '../../../prisma/generated/prisma-client-js';
import { PrismaService } from '../../global-services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { caseInsensitiveQueryBuilder } from '../../common/prismaUtils';
import { CreateBotDto } from './dto/create-bot.dto';
const pLimit = require('p-limit');
const limit = pLimit(1);
import fs from 'fs';
import FormData from 'form-data';

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

  sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  // TODO: restrict type of config
  async start(id: string, config: any, adminToken: string) {
    const pageSize: number = config.cadence.perPage;
    const segmentUrl: string = config.url;
    const userCountUrl = `${segmentUrl.substring(0, segmentUrl.indexOf('?'))}/count`;
    const userCount: number = await fetch(
      userCountUrl,
      {
        //@ts-ignore
        timeout: 5000,
        headers: { 'admin-token': adminToken }
      }
    )
    .then(resp => resp.json())
    .then(resp => {
      if (resp.totalCount)
        return resp.totalCount;
      else
        throw new HttpException(
          'Failed to get user count',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
    })
    .catch(response => {
      throw new HttpException(
        response,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
    let pages = Math.ceil(userCount / pageSize);
    const promisesFunc: string[] = [];
    for (let page = 1; page <= pages; page++) {
      console.log(
        `${this.configService.get(
          'UCI_CORE_BASE_URL',
        )}/campaign/start?campaignId=${id}&page=${page}`,
      );
      const url = `${this.configService.get(
        'UCI_CORE_BASE_URL',
      )}/campaign/start?campaignId=${id}&page=${page}`;
      promisesFunc.push(url);
    }
    let promises = promisesFunc.map((url) => {
      return limit(() =>
        fetch(url, { headers: { 'admin-token': adminToken } }).then((s) => {
          this.sleep(1000);
        }),
      );
    });
    return await Promise.all(promises)
      .then((res) => true)
      .catch((err) => {
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
    botImage: Express.Multer.File
  ): Promise<Bot | null> {
    // Check for unique name
    const name = data.name;
    const alreadyExists = await this.prisma.bot.findUnique({
      where: {
        name,
      },
    });
    if (!alreadyExists) {
      const formData = new FormData();
      const fileToUpload = fs.createReadStream(botImage.path);
      formData.append('file', fileToUpload, botImage.originalname);

      const requestOptions = {
        method: 'POST',
        body: formData,
        timeout: 5000,
      };

      return fetch(
        `${this.configService.get<string>('MINIO_MEDIA_UPLOAD_URL')}`,
        //@ts-ignore
        requestOptions
      )
      .then(resp => resp.json())
      .then(async resp => {
        if (!resp.fileName) {
          console.log("Bot image upload failed!");
          throw new HttpException(
            'Bot image upload failed',
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
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
          botImage: resp.fileName,
        };
        return this.prisma.bot.create({ data: createData });
      });
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

  async findAllContextual(ownerID: string | null, ownerOrgID: string | null): Promise<Bot[]> {
    const botData = await this.prisma.bot.findMany({
      where: {
        ownerID: ownerID,
        ownerOrgID: ownerOrgID,
      },
      include: this.include,
    });

    const promises: Promise<any>[] = [];
    const botsToResolve: Bot[] = [];
    botData.forEach(bot => {
      if (bot.botImage) {
        botsToResolve.push(bot);
        promises.push(
          fetch(
            `${this.configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}?fileName=${bot.botImage}`,
            //@ts-ignore
            {timeout: 5000}
          ).then(resp => resp.text())
        );
      }
    });

    return Promise.allSettled(promises)
    .then(results => {
      results.forEach((result, index) => {
        if (result.status == 'fulfilled') {
          botsToResolve[index].botImage = result.value;
        }
        else {
          botsToResolve[index].botImage = null;
        }
      });

      return botData;
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
