
import { Prisma } from '@prisma/client'
import { ConversationLogic } from './conversationLogic.entity'


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
