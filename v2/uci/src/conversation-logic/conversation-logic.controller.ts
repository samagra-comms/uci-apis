import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateConversationLogicDto } from '../generated/nestjs-dto/create-conversationLogic.dto';
import { UpdateConversationLogicDto } from '../generated/nestjs-dto/update-conversationLogic.dto';
import { ConversationLogicService } from './conversation-logic.service';

@Controller('conversation-logic')
export class ConversationLogicController {
  constructor(
    private readonly conversationLogicService: ConversationLogicService,
  ) {}

  @Post()
  create(@Body() createConversationLogicDto: CreateConversationLogicDto) {
    return this.conversationLogicService.create(createConversationLogicDto);
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
  update(
    @Param('id') id: string,
    @Body() updateConversationLogicDto: UpdateConversationLogicDto,
  ) {
    return this.conversationLogicService.update(id, updateConversationLogicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationLogicService.remove(id);
  }
}
