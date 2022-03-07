
import {Prisma} from '@prisma/client'




export class UpdateAdapterDto {
  channel?: string;
provider?: string;
config?: Prisma.InputJsonValue;
name?: string;
}
