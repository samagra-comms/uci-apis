import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from '../../global-services/prisma.service';
import { AdaptersService } from './adapter.service';
import { ApiTags } from '@nestjs/swagger';
import { AdapterDTO } from './dto';
import { Adapter } from 'prisma/generated/prisma-client-js';
import { PrismaError } from 'src/common/prismaError';

@ApiTags('Adapters')
@UseInterceptors()
@Controller({
  path: 'adapter',
})
export class AdaptersController {
  constructor(
    private prisma: PrismaService,
    private readonly adaptersService: AdaptersService,
  ) {}

  @Post()
  create(@Body() adapter: AdapterDTO): Promise<Adapter | PrismaError> {
    return this.adaptersService.create(adapter);
  }

  @Get()
  findAll() {
    return this.adaptersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adaptersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdapterDto: any) {
    return this.adaptersService.update(id, updateAdapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adaptersService.remove(+id);
  }
}
