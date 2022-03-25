
import {Prisma} from '@prisma/client'




export class CreateAdapterDto {
  channel: string;
provider: string;
config: Prisma.InputJsonValue;
name: string;
}
