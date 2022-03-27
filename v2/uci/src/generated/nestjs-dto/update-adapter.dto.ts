import { Prisma } from '../../../prisma/generated/prisma-client-js';

export class UpdateAdapterDto {
  channel?: string;
  provider?: string;
  config?: Prisma.InputJsonValue;
  name?: string;
}
