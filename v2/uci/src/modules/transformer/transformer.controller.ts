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
import { TransformerService } from './transformer.service';
import { AddResponseObjectInterceptor } from '../../interceptors/addResponseObject.interceptor';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { AddROToResponseInterceptor } from '../../interceptors/addROToResponse.interceptor';

@ApiTags('Transformer')
@UseInterceptors(
  AddResponseObjectInterceptor,
  AddAdminHeaderInterceptor,
  AddOwnerInfoInterceptor,
  AddROToResponseInterceptor,
)
@Controller({
  path: 'transformer',
})
export class TransformerController {
  constructor(
    private readonly transformerService: TransformerService,
  ) { }

  @Post()
  create(@Body() createTransformerDto: any) {
    return this.transformerService.create(createTransformerDto);
  }

  @Get()
  findAll() {
    return this.transformerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transformerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransformerDto: any) {
    return this.transformerService.update(id, updateTransformerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transformerService.remove(id);
  }
}
