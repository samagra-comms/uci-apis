
import {Prisma} from '@prisma/client'




export class CreateTransformerDto {
  name: string;
tags: string[];
config: Prisma.InputJsonValue;
}
