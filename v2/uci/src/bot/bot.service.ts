import { Injectable } from '@nestjs/common';
import { Bot } from '../../prisma/generated/prisma-client-js';
import { CreateBotDto } from '../generated/nestjs-dto/create-bot.dto';
import { UpdateBotDto } from '../generated/nestjs-dto/update-bot.dto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class BotService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateBotDto): Promise<Bot | null> {
    return this.prisma.bot.create({ data });
  }

  findAll(): Promise<Bot[]> {
    return this.prisma.bot.findMany();
  }

  findOne(id: string): Promise<Bot | null> {
    return this.prisma.bot.findUnique({ where: { id } });
  }

  update(id: string, updateAdapterDto: UpdateBotDto) {
    return this.prisma.adapter.update({
      where: {
        id,
      },
      data: updateAdapterDto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} adapter`;
  }
}
