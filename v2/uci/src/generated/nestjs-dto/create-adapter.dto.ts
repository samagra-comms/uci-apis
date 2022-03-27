import { Prisma } from '../../../prisma/generated/prisma-client-js';

export class CreateAdapterDto {
  channel: string;
  provider: string;
  config: Prisma.InputJsonValue;
  name: string;
}
