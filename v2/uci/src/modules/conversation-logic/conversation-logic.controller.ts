import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConversationLogicService } from './conversation-logic.service';
import { AddResponseObjectInterceptor } from '../../interceptors/addResponseObject.interceptor';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { AddROToResponseInterceptor } from '../../interceptors/addROToResponse.interceptor';

@ApiTags('ConversationLogic')
@UseInterceptors(
  AddResponseObjectInterceptor,
  AddAdminHeaderInterceptor,
  AddOwnerInfoInterceptor,
  AddROToResponseInterceptor,
)
@Controller({
  path: 'conversationLogic',
})
export class ConversationLogicController {
  constructor(
    private readonly conversationLogicService: ConversationLogicService,
  ) {}

  @Post()
  create(@Body() createConversationLogicDto: any) {
    return this.conversationLogicService.create(
      createConversationLogicDto.data,
    );
  }

  @Get()
  findAll() {
    return this.conversationLogicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationLogicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationLogicDto: any) {
    return this.conversationLogicService.update(id, updateConversationLogicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationLogicService.remove(id);
  }
}
