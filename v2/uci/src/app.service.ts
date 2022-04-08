import { Injectable } from '@nestjs/common';
import { PrismaService } from './global-services/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getBotCount(): Promise<number> {
    return this.prisma.bot.count();
  }
}
