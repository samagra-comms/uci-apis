import { Prisma } from '../../../prisma/generated/prisma-client-js';
import { ConversationLogic } from './conversationLogic.entity';

export class Adapter {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  channel: string;
  provider: string;
  config: Prisma.JsonValue;
  name: string;
  ConversationLogic?: ConversationLogic[];
}
