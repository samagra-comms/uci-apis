import { Prisma } from '../../prisma/generated/prisma-client-js';
import { PrismaError } from './prismaError';

export const stackTraceParser = (stackTrace: string | undefined): string[] => {
  if (stackTrace === undefined) return [];
  return stackTrace.split('\n');
};

export const prismaErrorHandler = (error: any): PrismaError => {
  const parsedStackTrace = error.message.split('\n');
  const errorMessage = parsedStackTrace[parsedStackTrace.length - 1].trim();
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          code: error.code,
          message: errorMessage,
          stackTrace: stackTraceParser(error.stack),
        };
      default:
        return {
          code: 'UNIDENTIFIED',
          message: 'Not Implemented',
          stackTrace: [] as string[],
        };
    }
  } else {
    return {
      code: 'UNIDENTIFIED',
      message: 'Not Implemented',
      stackTrace: [] as string[],
    };
  }
};
