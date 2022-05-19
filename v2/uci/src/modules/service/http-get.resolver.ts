import fetch from 'isomorphic-fetch';
import userSchema from '../service/schema/user.schema.json';
import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';
import { ConfigService } from '@nestjs/config';
import { SecretsService } from '../secrets/secrets.service';
import { TelemetryService } from 'src/global-services/telemetry.service';
import { ErrorType, GetRequestConfig, GetRequestResolverError } from './types';
import { ServiceQueryType } from './enum';
import { User } from './schema/user.dto';
import { url } from 'inspector';
const ajv = new Ajv();

@Injectable()
export class GetRequestResolverService {
  validate = ajv.compile(userSchema);
  constructor(
    private configService: ConfigService,
    private secretsService: SecretsService,
    private telemetryService: TelemetryService,
  ) {}

  async verify(
    queryType: ServiceQueryType,
    getRequestConfig: GetRequestConfig,
    user: string,
  ) {
    const secretPath = `${user}/${getRequestConfig.credentials.variable}`;
    const headers = await this.secretsService.getAllSecrets(secretPath);
    // const variables = getRequestConfig.verificationParams;

    const usersOrError: User[] | GetRequestResolverError = await this.getUsers(
      getRequestConfig.url,
      headers,
      getRequestConfig.errorNotificationWebhook,
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
    getRequestConfig: GetRequestConfig,
    user: string,
  ): Promise<User[]> {
    const secretPath = `${user}/${getRequestConfig.credentials.variable}`;
    const headers = await this.secretsService.getAllSecrets(secretPath);
    // const variables = getRequestConfig.verificationParams;
    const errorNotificationWebhook = getRequestConfig.errorNotificationWebhook;
    const usersOrError: User[] | GetRequestResolverError = await this.getUsers(
      getRequestConfig.url,
      headers,
      errorNotificationWebhook,
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
    url: string,
    headers?: any,
    errorNotificationWebhook?: string,
  ): Promise<User[] | GetRequestResolverError> {
    let isValidUserResponse = true;
    let currentUser: any;
    return fetch(url, {
      method: 'GET',
      headers: headers,
    }).then(async (resp) => {
      for (const user of resp.data.users) {
        currentUser = user;
        if (!this.validate(user)) {
          isValidUserResponse = false;
          //Notify Federated Service that user is invalid
          if (errorNotificationWebhook != null) {
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
          event: 'Failed to make GET request to federated service',
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
}
