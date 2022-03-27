import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { AdaptersService } from './adapters.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAdapterDto } from '../generated/nestjs-dto/update-adapter.dto';
import { CreateAdapterDto } from '../generated/nestjs-dto/create-adapter.dto';
import { Adapter } from '../generated/nestjs-dto/adapter.entity';

@ApiTags('Adapters')
@Controller('adapters')
export class AdaptersController {
  constructor(
    private prisma: PrismaService,
    private readonly adaptersService: AdaptersService,
  ) {}

  @Post()
  create(@Body() adapter: CreateAdapterDto): Promise<Adapter | null> {
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
  update(@Param('id') id: string, @Body() updateAdapterDto: UpdateAdapterDto) {
    return this.adaptersService.update(id, updateAdapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adaptersService.remove(+id);
  }
}
