import { Prisma } from '../../prisma/generated/prisma-client-js';

export const caseInsensitiveQueryBuilder = (
  param: string,
): Prisma.StringFilter => ({
  contains: param,
  mode: 'insensitive',
});
