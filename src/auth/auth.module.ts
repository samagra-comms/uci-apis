import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth.strategy';
import { AuthHelper } from './auth.helper';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        publicKey: `-----BEGIN PUBLIC KEY-----\n${config.get<string>(
          'AUTH_PUBLIC_KEY',
        )}\n-----END PUBLIC KEY-----`,
        algorithm: 'RS256',
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthHelper,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
