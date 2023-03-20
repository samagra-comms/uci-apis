import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getBotCount')
  async getBotCount(): Promise<any> {
    const botCount = await this.appService.getBotCount();
    return {
      data: botCount,
    };
  }
}
