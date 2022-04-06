export type PrismaError = {
  code: string;
  message: string;
  stackTrace: string[] | null;
  field?: string;
  methodName?: string;
};
