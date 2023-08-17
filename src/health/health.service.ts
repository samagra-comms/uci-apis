import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckError,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicator,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../global-services/prisma.service';
import { FormService } from '../modules/form/form.service';
import { io } from 'socket.io-client';
@Injectable()
export class HealthService extends HealthIndicator {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService,
    private readonly primsmaService: PrismaService,
    private readonly formService: FormService,
  ) {
    super();
  }

  async checkHealth(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.checkUciCoreHealth(),
      () => this.checkDatabaseHealth(),
      () => this.checkFormServiceHealth(),
      () => this.checkTransportSocketHealth(),
    ]);
  }

  async checkUciCoreHealth(): Promise<HealthIndicatorResult> {
    return this.http.pingCheck(
      'UCI_CORE',
      `${this.configService.get('UCI_CORE_BASE_URL')}/service/ping`,
      { timeout: 3000 },
    );
  }

  async checkDatabaseHealth(): Promise<HealthIndicatorResult> {
    try {
      await this.primsmaService.$queryRaw`SELECT 1`;
      return this.getStatus('PrismaService', true);
    } catch (e) {
      throw new HealthCheckError(
        'PrismaService failed to connect!',
        this.getStatus('PrismaService', false, { message: e.message }),
      );
    }
  }

  async checkFormServiceHealth(): Promise<HealthIndicatorResult> {
    return this.formService
      .login()
      .then(() => {
        return this.getStatus('FormService', true);
      })
      .catch((e) => {
        throw new HealthCheckError(
          'FormService failed to connect!',
          this.getStatus('FormService', false, { message: e.message }),
        );
      });
  }

  // async checkTransportSocketHealth(): Promise<HealthIndicatorResult> {

  //   const respone:Promise<HealthIndicatorResult> = new Promise((resolve, reject) => {
  // const payload: any = {
  //   content: {
  //     text: '*',
  //     appId: this.configService.get('SOCKET_APP_ID'),
  //     channel: this.configService.get('SOCKET_CHANNEL'),
  //     context: null,
  //     accessToken: null,
  //   },
  //   to: this.configService.get('SOCKET_TO'),
  // };

  // const connOptions = {
  //   transportOptions: {
  //     polling: {
  //       extraHeaders: {
  //         Authorization: `Bearer ${this.configService.get('AUTH_TOKEN')}`,
  //         channel: this.configService.get('SOCKET_CONNECTION_CHANNEL'),
  //       },
  //     },
  //   },
  //   query: {
  //     deviceId: this.configService.get('SOCKET_TO'),
  //   },
  //   autoConnect: false,
  // };

  //     const socket = io(`${this.configService.get('SOCKET_URL')}`, connOptions);

  //     const timeout = this.configService.get('SOCKET_TIMEOUT_TIME') || 20000;

  //     const timeoutPromise: NodeJS.Timeout | any = new Promise((_, reject) => {
  //       setTimeout(() => {
  //         socket.disconnect();
  //         reject('Socket response timed out');
  //       }, timeout);
  //     });

  //     const connectionTimeoutPromise: NodeJS.Timeout | any = new Promise(
  //       (_, reject) => {
  //         console.log('connectionTimeoutPromise');
  //         setTimeout(() => {
  //           socket.disconnect();
  //           reject('Socket connection timed out');
  //         }, timeout);
  //       },
  //     );

  //     const botResponsePromise: any = new Promise((resolve, reject) => {
  //       socket.on('botResponse', (data) => {
  //         clearTimeout(timeoutPromise);
  //         resolve('Socket response received');
  //       });
  //     });
  //     // socket.on('botResponse', (data) => {
  //     //   clearTimeout(timeoutPromise);
  //     //   resolve('Socket response received');
  //     // });
  // socket.on('session', (session) => {
  //   const socketID = session.socketID;
  //   const userID = session.userID;

  //   payload.from = socketID;
  //   payload.userId = userID;
  //   socket.emit('botRequest', payload);
  // });

  //     socket.on('connect', () => {
  //       clearTimeout(connectionTimeoutPromise);
  //     });

  //     socket.on('disconnect', () => {
  //       clearTimeout(timeoutPromise);
  //       reject('Socket disconnected');
  //     });
  //     socket.connect();
  //     Promise.all([
  //       timeoutPromise,
  //       connectionTimeoutPromise,
  //       botResponsePromise,
  //     ])
  //       .then((dd: any) => {
  //         console.log({ dd });
  //         resolve(this.getStatus('TransportSocketService', true));
  //       })
  //       .catch((error) => {
  //         console.log('error:', { error });
  // return  new HealthCheckError(
  //     error,
  //     this.getStatus('TransportSocketService', false, {
  //       message: error,
  //     }),
  //   );
  //       });

  //   });
  //   console.log({respone})
  //   return respone
  // }

  async checkTransportSocketHealth(): Promise<any> {
    const baseUrl = this.configService.get('SOCKET_URL');
    const connOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${this.configService.get('AUTH_TOKEN')}`,
            channel: this.configService.get('SOCKET_CONNECTION_CHANNEL'),
          },
        },
      },
      query: {
        deviceId: this.configService.get('SOCKET_TO'),
      },
      autoConnect: false,
    };

    const payload: any = {
      content: {
        text: '*',
        appId: this.configService.get('SOCKET_APP_ID'),
        channel: this.configService.get('SOCKET_CHANNEL'),
        context: null,
        accessToken: null,
      },
      to: this.configService.get('SOCKET_TO'),
    };
    try {
      const socket = await this.connectSocket(baseUrl, connOptions);
      if (!socket) {
        return new HealthCheckError(
          'Socket connection timed out',
          this.getStatus('TransportSocketService', false, {
            message: 'Socket connection timed out',
          }),
        );
      }

      socket.on('session', async (session) => {
        console.log({ session });
        const socketID = session.socketID;
        const userID = session.userID;
        payload.from = socketID;
        payload.userId = userID;
      });

      const responseReceived = await this.sendBotRequest(socket, payload);
      socket.disconnect();
      if (responseReceived) {
        return this.getStatus('TransportSocketService', true);
      } else {
        return new HealthCheckError(
          'Bot response timed out',
          this.getStatus('TransportSocketService', false, {
            message: 'Bot response timed out',
          }),
        );
        // return { status: 'Error', message: 'Bot response timed out' };
      }
    } catch (error) {
      return new HealthCheckError(
        'An error occurred',
        this.getStatus('TransportSocketService', false, {
          message: 'An error occurred',
        }),
      );
    }
  }

  private async connectSocket(baseUrl: string, connOptions: any): Promise<any> {
    return new Promise(async (resolve) => {
      const socket = await io(baseUrl, connOptions);

      socket.connect();
      socket.on('connect', function () {
        resolve(socket);
      });
      socket.on('connect_error', () => {
        resolve(false);
      });
      setTimeout(async () => {
        resolve(false);
      }, 15000);
    });
  }

  private async sendBotRequest(socket: any, payload: any): Promise<boolean> {
    const newPayload = { ...payload };
    return new Promise(async (resolve) => {
        socket.on('session', async (session) => {
        const socketID = session.socketID;
        const userID = session.userID;

        newPayload.content.from = socketID;
        newPayload.content.userId = userID;
        console.log({ socket, newPayload });
        socket.emit('botRequest', newPayload);
      });
  
      socket.on('botResponse', (data) => {
        resolve(true);
      });
      setTimeout(() => {
        console.log('reject');
        resolve(false);
      }, 40000); // Wait for 15 seconds for bot response
    });
  }
}
