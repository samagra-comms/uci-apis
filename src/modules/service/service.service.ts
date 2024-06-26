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

  async resolve(service: Service, segment: number, page: number | undefined, owner: string | null, conversationToken: string) {
    const startTime = performance.now();
    this.logger.log(`ServiceService::resolve: Resolving users. Page: ${page}`);
    if (service.type === 'gql') {
      const resp = await this.gqlResolver.resolve(
        ServiceQueryType.all,
        service.config as GqlConfig,
        owner,
        page,
        conversationToken
      );
      this.logger.log(`ServiceService::resolve: Users resolved: ${resp.length}. Time taken: ${performance.now() - startTime}`);
      return resp;
    } else if (service.type === 'get') {
      const resp = await this.getRequestResolver.resolve(
        ServiceQueryType.all,
        service.config as GqlConfig,
        owner,
        segment,
        page,
        conversationToken
      );
      this.logger.log(`ServiceService::resolve: Users resolved: ${resp.length}. Time taken: ${performance.now() - startTime}`);
      return resp;
    } else {
      this.logger.error(`Unknown service type: ${service.type}`);
    }
  }
}
