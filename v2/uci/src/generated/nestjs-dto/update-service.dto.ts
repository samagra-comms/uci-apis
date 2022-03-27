import { Prisma } from '../../../prisma/generated/prisma-client-js';

export class UpdateServiceDto {
  type?: string;
  config?: Prisma.InputJsonValue;
  name?: string;
}
