import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, Inject,CACHE_MANAGER, ServiceUnavailableException, NotFoundException, BadRequestException} from '@nestjs/common';
import {
  Bot,
  BotStatus,
  Prisma,
} from '../../../prisma/generated/prisma-client-js';
import { PrismaService } from '../../global-services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { caseInsensitiveQueryBuilder } from '../../common/prismaUtils';
import { CreateBotDto } from './dto/create-bot.dto';
import { performance } from 'perf_hooks';
const pLimit = require('p-limit');
const limit = pLimit(1);
import fs from 'fs';
import FormData from 'form-data';
import { Cache } from 'cache-manager';

@Injectable()
export class BotService {
  private readonly logger: Logger;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    //@ts-ignore
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
  ) {
    this.logger = new Logger(BotService.name);
  }

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
    const startTime = performance.now();
    this.logger.log(`BotService::pause: Called with id: ${id}`);
    this.logger.log(`BotService::pause: Calling ${this.configService.get('UCI_CORE_BASE_URL')}/pause endpoint`);
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
        this.logger.log(`BotService::pause: Success with id: ${id}. Time taken: ${performance.now() - startTime} milliseconds.`);
        return true;
      })
      .catch((e) => {
        this.logger.error(`BotService::pause: Failed with id: ${id}, reason: ${e}. Time taken: ${performance.now() - startTime} milliseconds.`);
        return false;
      });
  }

  sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  // TODO: restrict type of config
  async start(id: string, config: any, conversationToken: string) {
    const startTime = performance.now();
    this.logger.log(`BotService::start: Called with id: ${id} and config: ${JSON.stringify(config)}`);
    const pageSize: number = config.cadence.perPage;
    const segmentUrl: string = config.url;
    const userCountUrl = `${segmentUrl.substring(0, segmentUrl.indexOf('?'))}/count`;
    this.logger.log(`BotService::start: Fetching total count from ${userCountUrl}`);
    const userCount: number = await fetch(
      userCountUrl,
      {
        //@ts-ignore
        timeout: 5000,
        headers: { 'conversation-authorization': conversationToken }
      }
    )
    .then(resp => resp.json())
    .then(resp => {
      if (resp.totalCount) {
        this.logger.log(`BotService::start: Fetched total count of users: ${resp.totalCount}`);
        return resp.totalCount;
      }
      else {
        this.logger.error(`BotService::start: Failed to fetch total count of users, reason: Response did not have 'totalCount'.`);
        throw new HttpException(
          'Failed to get user count',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    })
    .catch(err => {
      this.logger.error(`BotService::start: Failed to fetch total count of users, reason: ${err}`);
      throw new HttpException(
        err,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
    let pages = Math.ceil(userCount / pageSize);
    this.logger.log(`BotService::start: Total pages: ${pages}`);
    const promisesFunc: string[] = [];
    for (let page = 1; page <= pages; page++) {
      this.logger.log(
        `BotService::start: Calling endpoint: ${this.configService.get(
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
        fetch(url, { headers: { 'conversation-authorization': conversationToken } }).then((s) => {
          this.sleep(1000);
        }),
      );
    });
    return await Promise.all(promises)
      .then((res) => {
        this.logger.log(`BotService::start: Successfully pushed all pages to campaign. Time taken: ${performance.now() - startTime} milliseconds.`);
        return true;
      })
      .catch((err) => {
        this.logger.error(`BotService::start: Error querying campaign endpoint, reason: ${err}`);
        throw new InternalServerErrorException();
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
    const startTime = performance.now();
    this.logger.log(`BotService::create: Called with bot name ${data.name}.`);
    // Check for unique name
    const name = data.name;
    const startingMessage = data.startingMessage;
    const alreadyExists = await this.prisma.bot.findFirst({
      where: {
        OR: [
          { name: name },
          { startingMessage: startingMessage }
        ]
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
      
      await this.cacheManager.reset();
      this.logger.log('BotService::create: Uploading bot image to minio.');
      return fetch(
        `${this.configService.get<string>('MINIO_MEDIA_UPLOAD_URL')}`,
        //@ts-ignore
        requestOptions
      )
      .then(resp => resp.json())
      .then(async resp => {
        if (!resp.fileName) {
          this.logger.error("BotService::create: Bot image upload failed! Reason: Did not receive filename of uploaded file.");
          throw new ServiceUnavailableException('Bot image upload failed!');
        }
        const createData = {
          startingMessage: data.startingMessage,
          name: data.name,
          ownerID: data.ownerid,
          ownerOrgID: data.ownerorgid,
          status:
            data.status && data.status.toLocaleLowerCase() === 'enabled' ? BotStatus.ENABLED : BotStatus.DISABLED,
          startDate: this.getDateFromString(data.startDate),
          endDate: this.getDateFromString(data.endDate),
          tags: data.tags,
          purpose: data.purpose,
          description: data.description,
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
        const prismaResult = await this.prisma.bot.create({ data: createData });
        this.logger.log(`BotService::create: Bot created successfully. Time taken: ${performance.now() - startTime} milliseconds.`)
        return prismaResult;
      })
      .catch(err => {
        this.logger.error(`BotService::create: Bot image upload failed! Reason: ${err}`);
        throw new ServiceUnavailableException('Bot image upload failed!');
      });
    } else {
      this.logger.error(`Failed to create Bot. Reason: Bot with name '${data.name}' or starting message '${data.startingMessage}' already exists!`)
      throw new HttpException(
        'Bot already exists with the following name or starting message!',
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll(): Promise<Bot[]> {
    const startTime = performance.now();
    const prismaResult = await this.prisma.bot.findMany();
    this.logger.log(`BotService::findAll: Returning result of all bots. Time taken: ${performance.now() - startTime} milliseconds.`);
    return prismaResult;
  }

  async findAllContextual(ownerID: string | null, ownerOrgID: string | null): Promise<Bot[]> {
    const startTime = performance.now();
    const cacheKey = `bots_${ownerID}_${ownerOrgID}`;
    const cachedBots = await this.cacheManager.get(cacheKey);
    if (cachedBots) {
      this.logger.log(`BotService::findAllContextual: Returning bot data. Time taken: ${performance.now() - startTime} milliseconds.`);
      return cachedBots;
    }

    this.logger.log(`BotService::findAllContextual: Called with ownerId: ${ownerID} and ownerOrgId: ${ownerOrgID}`);
    const botData = await this.prisma.bot.findMany({
      where: {
        ownerID: ownerID,
        ownerOrgID: ownerOrgID,
      },
      include: this.include,
    });
    this.logger.log(`BotService::findAllContextual: Fetched data of ${botData.length} bots.`);
    const promises: Promise<any>[] = [];
    const botsToResolve: Bot[] = [];
    this.logger.log(`BotService::findAllContextual: Resolving image urls for bots.`);
    botData.forEach(bot => {
      if (bot.botImage) {
        botsToResolve.push(bot);
        promises.push(
          fetch(
            `${this.configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}?fileName=${bot.botImage}`,
            //@ts-ignore
            {timeout: 5000}
          ).then(resp => {
            if (!resp.ok) {
              throw new Error("Failed to resolve minio image");
            }
            return resp.text();
          })
        );
      }
    });

    return Promise.allSettled(promises)
    .then(results => {
      results.forEach((result, index) => {
        if (result.status == 'fulfilled') {
          this.logger.log(`BotService::findAllContextual: Resolved bot image for bot: ${botsToResolve[index].name}.`);
          botsToResolve[index].botImage = result.value;
        }
        else {
          this.logger.error(`BotService::findAllContextual: Failed to resolve bot image for bot: ${botsToResolve[index].name}.`);
          botsToResolve[index].botImage = null;
        }
      });

        this.logger.log(`BotService::findAllContextual: Returning bot data. Time taken: ${performance.now() - startTime} milliseconds.`);
        this.cacheManager.set(cacheKey, botData);
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

  async findOne(id: string): Promise<Prisma.BotGetPayload<{
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
    const startTime = performance.now();
    const cacheKey = `bot_${id}`;
    let bot = await this.cacheManager.get(cacheKey);
    if (bot) {
      this.logger.log(`BotService::findOne: Returning response of find one query. Time taken: ${performance.now() - startTime} milliseconds.`);
      return bot;
    }
    const botData = await this.prisma.bot.findUnique({
      where: { id },
      include: this.include,
    });
    if (!botData) {
      this.logger.log(`BotService::findOne: No bot found with this id.`);
      return null;
    }
    if (!botData.botImage) {
      this.cacheManager.set(cacheKey, botData);
      this.logger.log(`BotService::findOne: Returning response of find one query. Time taken: ${performance.now() - startTime} milliseconds.`);
      return botData;
    }
    // Resolve bot image
    return fetch(
      `${this.configService.get<string>('MINIO_GET_SIGNED_FILE_URL')}?fileName=${botData.botImage}`,
      //@ts-ignore
      {timeout: 5000}
    )
    .then(resp => {
      if (!resp.ok) {
        throw new Error("Failed to resolve minio image");
      }
      return resp.text();
    })
    .then(resp => {
      botData.botImage = resp;
      this.cacheManager.set(cacheKey, botData);
      this.logger.log(`BotService::findOne: Returning response of find one query. Time taken: ${performance.now() - startTime} milliseconds.`);
      return botData;
    })
    .catch(err => {
      botData.botImage = null;
      this.logger.log(`BotService::findOne: Bot image resolution failed, returning response of find one query. Time taken: ${performance.now() - startTime} milliseconds.`);
      return botData;
    });
  }

  async search(
    perPage: number,
    page: number,
    name: string,
    startingMessage: string,
    match: boolean,
    ownerID: string,
    ownerOrgID: string,
    sortBy: string | undefined,
  ): Promise<{ data: Bot[]; totalCount: number } | null> {
    const startTime = performance.now();
    let filterQuery: any = {};
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
    if (ownerID || ownerOrgID) {
      filterQuery.ownerID = ownerID;
      filterQuery.ownerOrgID = ownerOrgID;
    }
    if (!sortBy) {
      sortBy = 'id';
    }
    const data = await this.prisma.bot.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: filterQuery,
      include: this.include,
      orderBy: {
        [sortBy]: 'asc'
      }
    });
    this.logger.log(`BotService::find: Returning response of find query. Time taken: ${performance.now() - startTime} milliseconds.`);
    return { data: data, totalCount: data.length };
  }

  async update(id: string, updateBotDto: any) {
    const existingBot = await this.findOne(id);
    if (!existingBot) {
      throw new NotFoundException("Bot does not exist!")
    }
    if (updateBotDto.logicIDs) {
      updateBotDto.logicIDs = {
        set: updateBotDto.logicIDs.map((logic) => {
          return {
            id: logic,
          };
        }),
      }
    }
    if (updateBotDto.users) {
      updateBotDto.users = {
        set: updateBotDto.users.map((user) => {
          return {
            id: user,
          };
        }),
      }
    }
    if (updateBotDto.endDate) {
      const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(updateBotDto.endDate)) {
        throw new BadRequestException(`Bad date format. Please provide date in 'yyyy-mm-dd' format.`)
      }
      updateBotDto.endDate = new Date(updateBotDto.endDate);
    }
    const updatedBot = await this.prisma.bot.update({
      where: {
        id,
      },
      data: updateBotDto,
    });
    await this.cacheManager.reset();
    return updatedBot;
  }

  remove(id: string) {
    return `This action removes a #${id} adapter`;
  }
}
