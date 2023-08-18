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

  async checkTransportSocketHealth(): Promise<any> {
    const baseUrl = this.configService.get('SOCKET_URL');
    const connOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${this.configService.get(
              'SOCKET_AUTH_TOKEN',
            )}`,
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

      const responseReceived = await this.sendBotRequest(socket, payload);

      if (responseReceived) {
        socket.disconnect();
        return this.getStatus('TransportSocketService', true);
      } else {
        return new HealthCheckError(
          'Bot response timed out',
          this.getStatus('TransportSocketService', false, {
            message: 'Bot response timed out',
          }),
        );
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
      }, this.configService.get('SOCKET_TIMEOUT_TIME') || 20000);
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
        socket.emit('botRequest', newPayload);
      });

      socket.on('botResponse', (data) => {
        resolve(true);
      });
      setTimeout(() => {
        resolve(false);
      }, this.configService.get('SOCKET_TIMEOUT_TIME') || 20000); // Wait for 15 seconds for bot response
    });
  }
}
