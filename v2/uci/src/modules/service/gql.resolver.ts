import fetch from 'isomorphic-fetch';
import userSchema from '../service/schema/user.schema.json';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  QueryOptions,
  gql,
  ApolloQueryResult,
} from '@apollo/client';

import Ajv from 'ajv';
const ajv = new Ajv();

import { Injectable, Scope } from '@nestjs/common';
import { SecretsService } from '../secrets/secrets.service';
import { ConfigService } from '@nestjs/config';
import { User } from './schema/user.dto';
import { TelemetryService } from '../../global-services/telemetry.service';
import { ErrorType, GqlConfig, GqlResolverError } from './types';
import { ServiceQueryType } from './enum';

@Injectable()
export class GQLResolverService {
  validate = ajv.compile(userSchema);
  constructor(
    private configService: ConfigService,
    private secretsService: SecretsService,
    private telemetryService: TelemetryService,
  ) {}

  async verify(
    queryType: ServiceQueryType,
    gqlConfig: GqlConfig,
    user: string,
  ) {
    //secretPath = <user>/<variable>
    const secretPath = `${user}/${gqlConfig.credentials.variable}`;
    const headers = await this.secretsService.getAllSecrets(secretPath);
    const client = this.getClient(gqlConfig.url, headers);
    const variables = gqlConfig.verificationParams;

    const usersOrError: User[] | GqlResolverError = await this.getUsers(
      client,
      gqlConfig.query,
      variables,
    );
    if (usersOrError instanceof Array) {
      const totalUsers = usersOrError.length;
      const sampleUser = usersOrError[0];

      //TODO: Additional Checks
      switch (queryType) {
        case ServiceQueryType.byPhone:
          break;
        case ServiceQueryType.byId:
          break;
        case ServiceQueryType.all:
          break;
      }

      return {
        total: totalUsers,
        schemaValidated: true,
        sampleUser,
      };
    } else {
      return {
        total: 0,
        schemaValidated: false,
        error: usersOrError,
      };
    }
  }

  async resolve(
    queryType: ServiceQueryType,
    gqlConfig: GqlConfig,
    user: string,
  ): Promise<User[]> {
    const secretPath = `${user}/${gqlConfig.credentials.variable}`;
    const headers = await this.secretsService.getAllSecrets(secretPath);
    const client = this.getClient(gqlConfig.url, headers);
    const variables = gqlConfig.verificationParams;

    const usersOrError: User[] | GqlResolverError = await this.getUsers(
      client,
      gqlConfig.query,
      variables,
    );
    if (usersOrError instanceof Array) {
      //TODO: Additional Checks
      switch (queryType) {
        case ServiceQueryType.byPhone:
          break;
        case ServiceQueryType.byId:
          break;
        case ServiceQueryType.all:
          break;
      }

      return usersOrError;
    } else {
      return [];
    }
  }

  async getUsers(
    client: ApolloClient<any>,
    query: string,
    variables?: any,
    errorNotificationWebhook?: string,
  ): Promise<User[] | GqlResolverError> {
    let isValidUserResponse = true;
    let currentUser: any;
    return this.query(client, query, variables).then(async (resp) => {
      for (const user of resp.data.users) {
        currentUser = user;
        if (!this.validate(user)) {
          isValidUserResponse = false;
          //Notify Federated Service that user is invalid
          if (errorNotificationWebhook) {
            await this.notifyOnError(
              errorNotificationWebhook,
              user,
              this.validate.errors,
            );
            break;
          }
        }
      }
      if (isValidUserResponse) {
        return resp.data.users;
      } else {
        return {
          error: this.validate.errors,
          errorType: ErrorType.UserSchemaMismatch,
          user: currentUser,
        };
      }
    });
  }

  public notifyOnError(
    errorNotificationWebhook: string,
    user: User,
    error: any,
  ): Promise<any> {
    return fetch(errorNotificationWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        error,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch(async (e) => {
        await this.telemetryService.client.capture({
          distinctId: 'NestJS-Local',
          event: 'Failed to notify federated service',
          properties: {
            error,
            user,
            errorNotificationWebhook,
          },
        });
        return {
          error: e,
        };
      });
  }

  async query(
    client: ApolloClient<any>,
    query: string,
    variables?: any,
  ): Promise<ApolloQueryResult<any>> {
    const q: QueryOptions = {
      query: gql`
        ${query}
      `,
      variables,
    };
    return client.query(q);
  }

  getClient = (
    uri: string,
    headers: { [key: string]: string },
  ): ApolloClient<any> => {
    return new ApolloClient({
      link: new HttpLink({
        uri: uri,
        headers: headers,
        fetch: fetch,
      }),
      cache: new InMemoryCache(),
    });
  };
}
