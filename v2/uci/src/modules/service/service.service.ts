import { Injectable, Logger } from '@nestjs/common';
import { Service } from 'prisma/generated/prisma-client-js';
import { ServiceQueryType } from './enum';
import { GQLResolverService } from './gql.resolver';
import { GetRequestResolverService } from './http-get.resolver';
import { GqlConfig } from './types';

@Injectable()
export class ServiceService {
  logger: Logger;
  constructor(
    private readonly gqlResolver: GQLResolverService,
    private readonly getRequestResolver: GetRequestResolverService,
  ) {
    this.logger = new Logger('ServiceService');
  }

  resolve(service: Service, page: number | undefined, owner: string | null) {
    if (service.type === 'gql') {
      return this.gqlResolver.resolve(
        ServiceQueryType.all,
        service.config as GqlConfig,
        owner,
        page
      );
    } else if (service.type === 'get') {
      return this.getRequestResolver.resolve(
        ServiceQueryType.all,
        service.config as GqlConfig,
        owner,
        page
      );
    } else {
      this.logger.error(`Unknown service type: ${service.type}`);
    }
  }
}
