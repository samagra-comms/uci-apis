import { PartialType } from '@nestjs/swagger';
import { CreateConversationLogicDto } from './create-conversation-logic.dto';

export class UpdateConversationLogicDto extends PartialType(CreateConversationLogicDto) {}
