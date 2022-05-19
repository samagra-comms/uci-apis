import fetch from 'isomorphic-fetch';
import userSchema from '../service/schema/user.schema.json';
import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';
import { ConfigService } from '@nestjs/config';
import { SecretsService } from '../secrets/secrets.service';
import { TelemetryService } from 'src/global-services/telemetry.service';
import {
  ErrorType,
  PostRequestConfig,
  PostRequestResolverError,
} from './types';
import { ServiceQueryType } from './enum';
import { User } from './schema/user.dto';
const ajv = new Ajv();

@Injectable()
export class PostRequestResolverService {
  validate = ajv.compile(userSchema);
  constructor(
    private configService: ConfigService,
    private secretsService: SecretsService,
    private telemetryService: TelemetryService,
  ) {}

  async verify(
    queryType: ServiceQueryType,
    postRequestConfig: PostRequestConfig,
    user: string,
  ) {
    const secretPath = `${user}/${postRequestConfig.credentials.variable}`;
    const headers = await this.secretsService.getAllSecrets(secretPath);
    // const variables = postRequestConfig.verificationParams;

    const usersOrError: User[] | PostRequestResolverError = await this.getUsers(
      postRequestConfig.url,
      headers,
      postRequestConfig.requestBody,
      postRequestConfig.errorNotificationWebhook,
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
    postRequestConfig: PostRequestConfig,
    user: string,
  ): Promise<User[]> {
    const secretPath = `${user}/${postRequestConfig.credentials.variable}`;
    const headers = await this.secretsService.getAllSecrets(secretPath);
    // const variables = postRequestConfig.verificationParams;
    const errorNotificationWebhook = postRequestConfig.errorNotificationWebhook;
    const usersOrError: User[] | PostRequestResolverError = await this.getUsers(
      postRequestConfig.url,
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
    requestBody?: any,
    errorNotificationWebhook?: string,
  ): Promise<User[] | PostRequestResolverError> {
    let isValidUserResponse = true;
    let currentUser: any;
    return fetch(url, {
      method: 'POST',
      body: requestBody == null ? undefined : JSON.stringify(requestBody),
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
          event: 'Failed to make POST request to federated service',
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
