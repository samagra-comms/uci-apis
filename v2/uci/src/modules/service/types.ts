import { User } from './schema/user.dto';

export type GqlConfig = {
  url: string;
  query: string;
  cadence: {
    perPage: number;
    retries: number;
    timeout: number;
    concurrent: boolean;
    pagination: boolean;
    'retries-interval': number;
  };
  pageParam: string;
  credentials: {
    vault: string;
    variable: string;
  };
  verificationParams: {
    phone?: string;
    id?: string;
  };
  errorNotificationWebhook?: string;
};

export enum ErrorType {
  UserSchemaMismatch = 'UserSchemaMismatch',
  UserNotFound = 'UserNotFound',
}

export type GqlResolverError = {
  errorType: ErrorType;
  error: Error;
  user?: User;
};
