import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Headers,
  Query,
  UploadedFile,
  UnsupportedMediaTypeException,
  BadRequestException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AddResponseObjectInterceptor } from '../../interceptors/addResponseObject.interceptor';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { BotService } from './bot.service';
import { AddROToResponseInterceptor } from '../../interceptors/addROToResponse.interceptor';
import { ServiceService } from '../service/service.service';
import { BotStatus, Prisma } from '../../../prisma/generated/prisma-client-js';
import { DeviceManagerService } from '../user-segment/fusionauth/fusionauth.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FastifyFileInterceptor } from '../../interceptors/file.interceptor';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';
import fs from 'fs';


const editFileName = (req: Request, file: Express.Multer.File, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|)$/)) {
    return callback(new UnsupportedMediaTypeException('Only jpg,jpeg,png files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('bot')
export class BotController {
  private readonly logger: Logger;

  constructor(
    private readonly botService: BotService,
    private readonly service: ServiceService,
    private readonly deviceManagerService: DeviceManagerService,
  ) {
    this.logger = new Logger(BotController.name);
  }

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FastifyFileInterceptor('botImage', {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
    AddResponseObjectInterceptor, //sequencing matters here
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  async create(@UploadedFile() botImage: Express.Multer.File, @Body() botData, @Headers() headers) {
    const createBotDto: {data: CreateBotDto} = JSON.parse(botData.data);
    const response = await this.botService.create({ ...createBotDto.data, ...headers }, botImage);
    fs.unlink(botImage.path, err => {
      console.log(err);
    });
    return response;
  }

  @Get('/all')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  findAll() {
    return this.botService.findAll();
  }

  @Get('/allContextual')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  findAllContextual(@Body() body: any) {
    return this.botService.findAllContextual(body.ownerId, body.ownerOrgId);
  }

  @Get('/search')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  async search(
    @Query('perPage') perPage: string | undefined,
    @Query('page') page: string | undefined,
    @Query('name') name: string,
    @Query('startingMessage') startingMessage: string,
    @Query('match') match: 'true' | 'false',
    @Query('sortBy') sortBy: string | undefined,
    @Body() body: any,
  ) {
    if (!perPage) {
      this.logger.log('perPage not provided, defaulting to 10.');
      perPage = '10';
    }
    if (!page) {
      this.logger.log('page not provided, defaulting to 1.');
      page = '1';
    }
    const allowedSortingFields = [
      "startingMessage",
      "name",
      "status",
      "createdDate",
      "endDate",
      "ownerid",
      "ownerorgid",
    ];
    if (sortBy && !allowedSortingFields.includes(sortBy)) {
      this.logger.error(`sorting by '${sortBy}' is not supported!`);
      throw new BadRequestException(`sorting by '${sortBy}' is not supported!`);
    }

    return await this.botService.search(
      parseInt(perPage),
      parseInt(page),
      name,
      startingMessage,
      match === 'true',
      body.ownerId,
      body.ownerOrgId,
      sortBy
    );
  }

  @Get(':id')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  findOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.findOne(id);
  }

  @Get('/start/:id')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  async startOne(@Param('id') id: string, @Headers() headers) {
    const bot: Prisma.BotGetPayload<{
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
    }> | null = await this.botService.findOne(id);
    if (!bot) {
      this.logger.error(`Start called on a bot which does not exist. BotId: ${id}`);
      throw new BadRequestException('Bot does not exist');
    }
    if (!bot.users || bot.users.length == 0 || !bot.users[0].all) {
      this.logger.error(`User Segment data not found in bot. BotId: ${id}`);
      throw new BadRequestException('Bot does not contain user segment data');
    }
    console.log(bot?.users[0].all);
    if (bot?.status != BotStatus.ENABLED) {
      throw new ServiceUnavailableException("Bot is not enabled!");
    }
    const res = await this.botService.start(id, bot?.users[0].all?.config, headers['conversation-authorization']);
    return res;
  }

  @Get('/:id/addUser/:userId')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  async addUserToBot(
    @Param('id') botId: string,
    @Param('userId') userId,
    @Headers() headers,
    @Body() body,
  ) {
    return this.deviceManagerService.addDevicenameToRegistry(botId, userId);
  }

  @Post('/:id/addUser/:userId')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  async addUserToBotPost(
    @Param('id') botId: string,
    @Param('userId') userId,
    @Headers() headers,
    @Body() body,
  ) {
    return this.deviceManagerService.addDevicenameToRegistry(botId, userId);
  }

  @Get('/pause/:id')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  pauseOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.pause(id);
  }

  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  @Get('/getAllUsers/:id/:page?')
  async getAllUsers(@Param('id') id: string, @Headers() headers, @Param('page') page?: number) {
    const bot: Prisma.BotGetPayload<{
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
    }> | null = await this.botService.findOne(id);
    bot ? console.log('Users for the bot', bot['users']) : '';
    if (bot && bot.users[0].all) {
      const users = await this.service.resolve(bot.users[0].all, page, bot.ownerID, headers['conversation-authorization']);
      return users;
    }
    return bot;
  }

  @Patch(':id')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  update(@Param('id') id: string, @Body() body: any) {
    const fieldsToInclude = [
      "startingMessage",
      "name",
      "tags",
      "users",
      "logicIDs",
      "status",
      "endDate",
      "ownerID",
      "ownerOrgID",
      "purpose",
      "description"
    ];
    const updateBotDto = Object.entries(body).reduce((acc, [key, value]) => {
      if (value !== undefined && fieldsToInclude.includes(key)) {
        acc[key] = value;
      }
      return acc;
    }, {});
    return this.botService.update(id, updateBotDto);
  }

  @Delete(':id')
  @UseInterceptors(
    AddResponseObjectInterceptor,
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  remove(@Param('id') id: string) {
    return this.botService.remove(id);
  }
}
