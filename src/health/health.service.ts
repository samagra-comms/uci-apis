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
import { io } from "socket.io-client";
@Injectable()
export class HealthService extends HealthIndicator{
    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly configService: ConfigService,
        private readonly primsmaService: PrismaService,
        private readonly formService: FormService
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
        return this.http.pingCheck('UCI_CORE', `${this.configService.get('UCI_CORE_BASE_URL')}/service/ping`, {timeout: 3000});
    }

    async checkDatabaseHealth(): Promise<HealthIndicatorResult> {
        try {
            await this.primsmaService.$queryRaw`SELECT 1`;
            return this.getStatus('PrismaService', true);
        } catch (e) {
            throw new HealthCheckError("PrismaService failed to connect!", this.getStatus('PrismaService', false, {message: e.message}));
        }
    }

    async checkFormServiceHealth(): Promise<HealthIndicatorResult> {
        return this.formService.login()
        .then(() => {
            return this.getStatus('FormService', true);
        })
        .catch((e) => {
            throw new HealthCheckError("FormService failed to connect!", this.getStatus('FormService', false, {message: e.message}));
        });
    }


    checkTransportSocketHealth(): Promise<HealthIndicatorResult> {
        return new Promise((resolve, reject) => {
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
    
    
            const socket = io(`${this.configService.get('SOCKET_URL')}`, connOptions);
    
            const timeout = this.configService.get('SOCKET_TIMEOUT_TIME') || 15000;
    
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    socket.disconnect();
                    reject(new Error('Socket response timed out'));
                }, timeout);
            });
    
            const connectionTimeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    socket.disconnect();
                    reject(new Error('Socket connection timed out'));
                }, timeout);
            });
    
            const botResponsePromise = new Promise((resolve, reject) => {
                socket.on('botResponse', (data) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    clearTimeout(timeoutPromise);
                    console.log('RESPONSE::::');
                    console.dir(data, { depth: null });
                    resolve('Socket response received');
                });
            });
    
            socket.on('session', (session) => {
                const socketID = session.socketID;
                const userID = session.userID;
    
                payload.from = socketID;
                payload.userId = userID;
            });
    
            socket.on('connect', () => {
                console.log('SOCKET ID', socket.id);
                console.log('Connected....');
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                clearTimeout(connectionTimeoutPromise);
                setTimeout(() => {
                    console.log('Payload', payload);
                    socket.emit('botRequest', payload);
                }, 3000);
            });
    
            socket.on('disconnect', () => {
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                clearTimeout(timeoutPromise);
                console.log('Disconnecting::::');
                console.log(socket.id); // undefined
                reject('Socket disconnected');
            });
    
            Promise.race([timeoutPromise, connectionTimeoutPromise, botResponsePromise])
                .then(() => {
                    resolve(this.getStatus('TransportSocketService', true));
                })
                .catch((error) => {
                    reject(new HealthCheckError(error.message, this.getStatus('TransportSocketService', false, { message: error.message })));
                });
    
            socket.connect();
        });
    }
    
}


