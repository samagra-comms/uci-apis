import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AdaptersService } from './adapters.service'; 
import {
  Prisma
} from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAdapterDto } from 'src/generated/nestjs-dto/update-adapter.dto';
import { CreateAdapterDto } from 'src/generated/nestjs-dto/create-adapter.dto';
import { Adapter } from 'src/generated/nestjs-dto/adapter.entity';

@ApiTags('Adapters')
@Controller('adapters')
export class AdaptersController {
  
  constructor(private prisma: PrismaService, private readonly adaptersService: AdaptersService) {}

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
