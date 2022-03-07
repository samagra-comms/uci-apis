
import { Prisma } from '@prisma/client'




export class CreateServiceDto {
  type: string;
  config?: Prisma.InputJsonValue;
  name?: string;
}
