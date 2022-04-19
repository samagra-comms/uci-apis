import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/global-services/prisma.service';
import { AddAdminHeaderInterceptor } from 'src/interceptors/addAdminHeader.interceptor';
import { AddOwnerInfoInterceptor } from 'src/interceptors/addOwnerInfo.interceptor';
import { AddResponseObjectInterceptor } from 'src/interceptors/addResponseObject.interceptor';
import { AddROToResponseInterceptor } from 'src/interceptors/addROtoResponse.interceptor';
import { SecretDTO } from './secret.dto';
import { SecretsService } from './secrets.service';
import { getSecretType } from './types';

@UseInterceptors(
  AddResponseObjectInterceptor,
  AddAdminHeaderInterceptor,
  AddOwnerInfoInterceptor,
  AddROToResponseInterceptor,
)
@Controller('secret')
export class SecretsController {
  constructor(
    private readonly secretService: SecretsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() secretDTO: SecretDTO): Promise<any> {
    console.log({ secretDTO });
    if (secretDTO.type === getSecretType(secretDTO.secretBody)) {
      await this.secretService.setSecret(
        secretDTO.ownerId + '/' + secretDTO.variableName,
        secretDTO.secretBody,
      );
    } else {
      throw new Error(
        'Type of the secret is not correct ' +
          getSecretType(secretDTO.secretBody) +
          ' detected',
      );
    }
  }

  @Get(':variableName')
  async findOne(
    @Param('variableName') variableName: string,
    @Body() body: any,
  ): Promise<any> {
    if (variableName) {
      const data = await this.secretService.getSecretByPath(
        body.ownerId + '/' + variableName,
      );
      return { [`${variableName}`]: data };
    } else {
      return this.secretService.getAllSecrets(body.ownerId);
    }
  }

  @Delete(':variableName')
  async deleteAll(
    @Param('variableName') variableName: string,
    @Body() body: any,
  ): Promise<any> {
    if (variableName) {
      return this.secretService.deleteSecret(body.ownerId + '/' + variableName);
    } else {
      return this.secretService.deleteAllSecrets(body.ownerId);
    }
  }
}
