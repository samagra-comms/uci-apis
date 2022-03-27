import { Prisma } from '../../../prisma/generated/prisma-client-js';

export class CreateTransformerDto {
  name: string;
  tags: string[];
  config: Prisma.InputJsonValue;
}
