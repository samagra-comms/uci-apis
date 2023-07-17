import FusionAuthClient, {
  RegistrationResponse,
  UserResponse,
} from '@fusionauth/typescript-client';

import ClientResponse from '@fusionauth/typescript-client/build/src/ClientResponse';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { retryPromiseWithDelay } from '../../../common/retry';
import { FusionAuthClientProvider } from './fusionauthClientProvider';

export enum FAStatus {
  SUCCESS = 'USER_ADDED',
  USER_EXISTS = 'USER_EXISTS',
  ERROR = 'ERROR',
}

const CryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');
const _ = require('lodash');

CryptoJS.lib.WordArray.words;

// For staging server
@Injectable()
export class DeviceManagerService {
  client: FusionAuthClient;
  anonymousBotId: string;
  encodedBase64Key: string;
  parsedBase64Key: string;
  logger: Logger;

  constructor(
    configService: ConfigService,
    fusionAuthClientProvider: FusionAuthClientProvider
  ) {
    this.client = fusionAuthClientProvider.getClient();
    this.anonymousBotId = configService.get<string>(
      'FUSIONAUTH_ANONYMOUS_BOT_APP_ID',
    ) as string;
    this.encodedBase64Key = configService.get<string>(
      'ENCRYPTION_KEY',
    ) as string;
    this.parsedBase64Key = CryptoJS.enc.Base64.parse(this.encodedBase64Key);
    this.logger = new Logger(DeviceManagerService.name);
  }

  getUserNameEncrypted = (username) => {
    return this.encrypt(username).toString();
  };

  encrypt = (plainString) => {
    const encryptedString = AES.encrypt(plainString, this.parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
    });
    return encryptedString;
  };

  decrypt = (encryptedString) => {
    const plainString = AES.decrypt(encryptedString, this.parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Utf8);
    return plainString;
  };

  addAnonymousBotID = async () => {
    this.addBotToRegistry(this.anonymousBotId);
  };

  addBotToRegistry = async (botID) => {
    return await retryPromiseWithDelay(
        () => {return this.client.createApplication(botID, { application: { name: botID } })},
        2,
        2000
      )
      .then(() => {
        this.logger.log('Bot Added to Registry: ' + botID);
      })
      .catch((e) => {
        this.logger.error(JSON.stringify(e));
        throw new InternalServerErrorException(e);
      });
  };

  addBotsToRegistry = async (botIDs: string[]): Promise<string[]> => {
    try {
      const promises = botIDs.map(async (botID) => {
        try {
          await this.client.createApplication(botID, { application: { name: botID } });
          return botID; // Return the botID if it is successfully added to the registry
        } catch (error) {
          console.error(`Failed to add bot ${botID}:`, error);
          return `Cannot add bot ${botID}`; // Return custom error message for failed bot IDs
        }
      });
  
      const results = await Promise.allSettled(promises);
      const successfulBotIDs: string[] = [];
  
      results.forEach((result) => {
        if (result.status === 'fulfilled' && typeof result.value === 'string' && !result.value.startsWith('Cannot')) {
          successfulBotIDs.push(result.value);
        }
      });
  
      if (successfulBotIDs.length === botIDs.length) {
        console.log('All bots added to the registry.');
      }
  
      return successfulBotIDs;
    } catch (error) {
      console.log('Error occurred while adding bots:', error);
      throw new InternalServerErrorException('Failed to add all bots to the registry.');
    }
  };
  
  botExists = async (botID) => {
    return this.client
      .retrieveApplication(botID)
      .then((response) => {
        return { status: true, user: response.response.application };
      })
      .catch((e) => {
        this.logger.log(`Bot doesn't exist in Registry: ${botID}`);
        return { status: false, user: null };
      });
  };

  isDeviceAlreadyExisting = async (username) => {
    return this.client
      .retrieveUserByUsername(username)
      .then((response: ClientResponse<UserResponse>) => {
        return { status: true, user: response.response.user };
      })
      .catch((e) => {
        this.logger.log(`Device doesn't exist in Registry: ${username}`);
        return { status: false, user: null };
      });
  };

  addDeviceToRegistry = async (botId, user) => {
    const deviceString = user.device.type + ':' + user.device.deviceID;
    const username = this.encrypt(deviceString).toString();

    const isDeviceExisting = await this.isDeviceAlreadyExisting(username);
    const isBotExisting = await this.botExists(botId);

    if (!isBotExisting.status) {
      await this.addBotToRegistry(botId);
    }

    if (!isDeviceExisting.status) {
      let fullName = '';
      if (user.firstName && user.lastName)
        fullName = user.firstName + ' ' + user.lastName;

      user.device.consent = true;

      let userRequestJSON: any = {
        user: {
          username: username,
          password: 'dummyUser',
          fullName: fullName,
          active: true,
          data: user,
        },
        registration: {
          applicationId: botId,
          username: username,
        },
      };

      if (fullName === '') delete userRequestJSON.user.fullName;

      return await retryPromiseWithDelay(
          () => this.client.register("", userRequestJSON),
          2,
          2000
        )
        .then((response: ClientResponse<RegistrationResponse>) => {
          return {
            userId: response.response.user?.id,
            status: FAStatus.SUCCESS,
          };
        })
        .catch((e: Error) => {
          this.logger.error(
            `Error Registering Device in Registry: BotId - ${botId}, device - ${deviceString}. Error: ${JSON.stringify(
              e.message,
            )}`,
          );
          return {
            userId: null,
            status: FAStatus.ERROR,
            error: e.message,
          };
        });
    } else {
      //Register user to existing bot
      const user = isDeviceExisting.user;
      let isUserRegistered;
      try {
        isUserRegistered = _.includes(
          user?.registrations?.map((s) => s.applicationId),
          botId,
        );
      } catch (e) {
        isUserRegistered = false;
      }

      if (isUserRegistered)
        return { userId: user?.id, status: FAStatus.USER_EXISTS };
      else {
        return await retryPromiseWithDelay(
            () => this.client.register(isDeviceExisting.user?.id as string, {
              registration: {
                applicationId: botId,
              },
            }),
            2,
            2000
          )
          .then((response) => {
            this.logger.log(
              `Device ${deviceString} added Successfully to Bot: ${botId}`,
            );
            return {
              userId: response.response.user?.id,
              status: FAStatus.SUCCESS,
            };
          })
          .catch((e) => {
            this.logger.error(
              `Error Registering Device in Registry: BotId - ${botId}, device - ${deviceString}`,
            );
            return {
              userId: null,
              status: FAStatus.ERROR,
              error: e.message,
            };
          });
      }
    }
  };

  addDevicenameToRegistry = async (botId, deviceName) => {
    this.logger.log(`DeviceManagerService::addDevicenameToRegistry: Adding device to`);
    const startTime = performance.now();
    const user = {
      device: {
        deviceID: deviceName.split(':')[1],
        type: deviceName.split(':')[0],
      },
    };
    const resp = this.addDeviceToRegistry(botId, user);
    this.logger.log(`DeviceManagerService::addDevicenameToRegistry: Added device to registry. Time taken: ${performance.now() - startTime}`)
    return resp;
  };

  addAnonymousDeviceToRegistry = async (username) => {
    const user = {
      device: {
        deviceID: username.split(':')[1],
        type: username.split(':')[0],
      },
    };
    return this.addDeviceToRegistry(this.anonymousBotId, user);
  };
}
