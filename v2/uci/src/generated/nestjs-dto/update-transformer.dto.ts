
import {Prisma} from '@prisma/client'




export class UpdateTransformerDto {
  name?: string;
tags?: string[];
config?: Prisma.InputJsonValue;
}
