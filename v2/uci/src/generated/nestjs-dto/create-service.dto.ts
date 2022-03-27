import { Prisma } from '../../../prisma/generated/prisma-client-js';

export class CreateServiceDto {
  type: string;
  config?: Prisma.InputJsonValue;
  name?: string;
}
