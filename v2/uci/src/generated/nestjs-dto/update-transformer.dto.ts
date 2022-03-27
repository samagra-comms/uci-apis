import { Prisma } from '../../../prisma/generated/prisma-client-js';

export class UpdateTransformerDto {
  name?: string;
  tags?: string[];
  config?: Prisma.InputJsonValue;
}
