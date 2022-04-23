import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';

@Module({
  providers: [SecretsService],
  controllers: [SecretsController],
})
export class SecretsModule {}
