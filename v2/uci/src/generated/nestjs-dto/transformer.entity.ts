import { Prisma } from '../../../prisma/generated/prisma-client-js';
import { Service } from './service.entity';
import { ConversationLogic } from './conversationLogic.entity';

export class Transformer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  tags: string[];
  config: Prisma.JsonValue;
  service?: Service;
  serviceId: string;
  ConversationLogics?: ConversationLogic[];
}
