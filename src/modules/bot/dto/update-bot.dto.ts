import { PartialType } from '@nestjs/swagger';
import { CreateBotDto } from './create-bot.dto';

export class UpdateBotDto extends PartialType(CreateBotDto) {}

export type ModifyNotificationDTO = {
    title?: string,
    description?: string,
}
