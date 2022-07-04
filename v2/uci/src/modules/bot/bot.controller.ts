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

@UseInterceptors(
  AddResponseObjectInterceptor,
  AddAdminHeaderInterceptor,
  AddOwnerInfoInterceptor,
  AddROToResponseInterceptor,
)
@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  create(@Body() createBotDto: any, @Headers() headers) {
    console.log({ headers });
    return this.botService.create(createBotDto);
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

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.findOne(id);
  }

  @Get('/start/:id')
  startOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.start(id);
  }

  @Get('/pause/:id')
  pauseOne(@Param('id') id: string, @Headers() headers, @Body() body) {
    return this.botService.pause(id);
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
