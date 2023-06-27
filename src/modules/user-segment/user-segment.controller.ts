import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserSegmentService } from './user-segment.service';

@Controller('user-segment')
export class UserSegmentController {
  constructor(private readonly userSegmentService: UserSegmentService) {}

  @Post()
  create(@Body() createUserSegmentDto: any) {
    return this.userSegmentService.create(createUserSegmentDto);
  }

  @Get()
  findAll() {
    return this.userSegmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSegmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSegmentDto: any) {
    return this.userSegmentService.update(id, updateUserSegmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSegmentService.remove(id);
  }
}
