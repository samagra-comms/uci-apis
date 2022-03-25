
import {Prisma} from '@prisma/client'




export class UpdateServiceDto {
  type?: string;
config?: Prisma.InputJsonValue;
name?: string;
}
