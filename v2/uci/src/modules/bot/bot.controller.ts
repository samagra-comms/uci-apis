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
  Req,
} from '@nestjs/common';
import { AddResponseObjectInterceptor } from '../../interceptors/addResponseObject.interceptor';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { BotService } from './bot.service';
import { AddROToResponseInterceptor } from '../../interceptors/addROToResponse.interceptor';
import { ServiceService } from '../service/service.service';
import { Bot, Prisma } from 'prisma/generated/prisma-client-js';
import { DeviceManagerService } from '../user-segment/fusionauth/fusionauth.service';
import { CreateBotDto } from './dto/create-bot.dto';

@UseInterceptors(
  AddResponseObjectInterceptor,
  AddAdminHeaderInterceptor,
  AddOwnerInfoInterceptor,
  AddROToResponseInterceptor,
)
@Controller('bot')
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly service: ServiceService,
    private readonly deviceManagerService: DeviceManagerService,
  ) {}

  @Post()
  create(@Body() createBotDto: { data: CreateBotDto }, @Headers() headers) {
    return this.botService.create({ ...createBotDto.data, ...headers });
  }

  @Get('/all')
  findAll() {
    return this.botService.findAll();
  }

  @Get('/search')
  find(
    @Query('perPage') perPage: string,
    @Query('page') page: string,
    @Query('name') name: string,
    @Query('startingMessage') startingMessage: string,
    @Query('match') match: 'true' | 'false',
    @Body() body: any,
  ) {
    if (!perPage) perPage = '10';
    if (!page) page = '1';
    return this.botService.find(
      parseInt(perPage),
      parseInt(page),
      name,
      startingMessage,
      match === 'true',
      body.ownerId,
      body.ownerOrgId,
    );
  }

  @Get('/search/internal')
  findForAdmin(
    @Query('perPage') perPage: string,
    @Query('page') page: string,
    @Query('name') name: string,
    @Query('startingMessage') startingMessage: string,
    @Query('match') match: 'true' | 'false',
    @Body() body: any,
  ) {
    return this.botService.findForAdmin(
      parseInt(perPage),
      parseInt(page),
      name,
      startingMessage,
      match === 'true',
      body.ownerId,
      body.ownerOrgId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.findOne(id);
  }

  @Get('/start/:id')
  startOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.start(id);
  }

  @Get('/:id/addUser/:userId')
  async addUserToBot(
    @Param('id') botId: string,
    @Param('userId') userId,
    @Headers() headers,
    @Body() body,
  ) {
    return this.deviceManagerService.addDevicenameToRegistry(botId, userId);
  }

  @Post('/:id/addUser/:userId')
  async addUserToBotPost(
    @Param('id') botId: string,
    @Param('userId') userId,
    @Headers() headers,
    @Body() body,
  ) {
    return this.deviceManagerService.addDevicenameToRegistry(botId, userId);
  }

  @Get('/pause/:id')
  pauseOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.pause(id);
  }

  @Get('/getAllUsers/:id')
  async getAllUsers(@Param('id') id: string, @Headers() headers, @Body() body) {
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
    if (bot && bot.users[0].all) {
      const users = await this.service.resolve(bot.users[0].all, bot.ownerID);
      return users;
    }
    return bot;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBotDto: any) {
    return this.botService.update(id, updateBotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botService.remove(id);
  }
}
